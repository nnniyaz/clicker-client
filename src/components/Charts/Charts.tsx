import React, {useLayoutEffect, useRef, useState} from 'react';
import ChartButtons from "../ChartButtons/ChartButtons";
import {IStats} from "../../models/IStats";
import {observer} from "mobx-react-lite";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_ru_RU from "@amcharts/amcharts4/lang/ru_RU";

import classes from "./Charts.module.scss";

am4core.useTheme(am4themes_animated);

export type Period = 'TODAY' | 'WEEK' | 'MONTH' | '3MONTH' | 'YEAR';

const Charts = observer(({data}: { data: IStats | null }) => {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('TODAY');

    const pieChart: any = useRef(null);
    const lineChart: any = useRef(null);

    useLayoutEffect(() => {
        let x = am4core.create("pieChart", am4charts.PieChart);
        x.logo.dispose();

        if (!data) {
            return;
        }

        const dataSet = [];
        for (let key in data.branches) {
            dataSet.push({
                name: key,
                value: data.branches[key].totalClicks
            })
        }

        x.data = dataSet;
        x.innerRadius = am4core.percent(40);
        x.legend = new am4charts.Legend();

        let pieSeries = x.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "name";

        pieChart.current = x;

        return () => {
            x.dispose();
        };
    }, [data]);

    useLayoutEffect(() => {
        let x = am4core.create("lineChart", am4charts.XYChart);
        x.logo.dispose();

        let interfaceColors = new am4core.InterfaceColorSet();

        if (!data) {
            return;
        }

        x.language.locale = am4lang_ru_RU;
        x.numberFormatter.language = new am4core.Language();
        x.numberFormatter.language.locale = am4lang_ru_RU;
        x.dateFormatter.language = new am4core.Language();
        x.dateFormatter.language.locale = am4lang_ru_RU;

        const branchNames = Object.keys(data.branches);

        const time = new Date().getTime();
        const localDate = new Date(time).toDateString();

        switch (selectedPeriod) {
            case 'TODAY':
                const dataSetToday = [];
                for (let i = 0; i < 24; i++) {
                    const item: any = {
                        "date": new Date(new Date(localDate).getTime() + (i * 3600 * 1000))
                    };

                    for (let j = 0; j < branchNames.length; j++) {
                        item[branchNames[j]] = data.branches[branchNames[j]].clicksToday[i] || 0;
                    }
                    dataSetToday.push(item);
                }
                x.data = dataSetToday;
                x.dateFormatter.dateFormat = "dd/MM/yyyy - HH:mm";
                break;
            case 'WEEK':
                const dataSetWeek = [];
                for (let i = 0; i < 7; i++) {
                    const item: any = {
                        "date": new Date(new Date(localDate).getTime() - (i * 24 * 3600 * 1000))
                    };

                    for (let j = 0; j < branchNames.length; j++) {
                        item[branchNames[j]] = data.branches[branchNames[j]].clicksLastWeek[i] || 0;
                    }
                    dataSetWeek.push(item);
                }
                x.data = dataSetWeek;
                x.dateFormatter.dateFormat = "dd/MM/yyyy";
                break;
            case 'MONTH':
                const dataSetMonth = [];
                for (let i = 0; i < 30; i++) {
                    const item: any = {
                        "date": new Date(new Date(localDate).getTime() - (i * 24 * 3600 * 1000))
                    };

                    for (let j = 0; j < branchNames.length; j++) {
                        item[branchNames[j]] = data.branches[branchNames[j]].clicksLastMonth[i] || 0;
                    }
                    dataSetMonth.push(item);
                }
                x.data = dataSetMonth;
                x.dateFormatter.dateFormat = "dd/MM/yyyy";
                break;
            case '3MONTH':
                const dataSet3Month: any = [];
                for (let i = 0; i < 90; i++) {
                    const item: any = {
                        "date": new Date(new Date(localDate).getTime() - (i * 24 * 3600 * 1000))
                    };

                    for (let j = 0; j < branchNames.length; j++) {
                        item[branchNames[j]] = data.branches[branchNames[j]].clicksLast3Month[i] || 0;
                    }
                    dataSet3Month.push(item);
                }
                x.data = dataSet3Month;
                x.dateFormatter.dateFormat = "dd/MM/yyyy";
                break;
            case 'YEAR':
                const dataSetYear = [];
                for (let i = 0; i < 365; i++) {
                    const item: any = {
                        "date": new Date(new Date(localDate).getTime() - (i * 24 * 3600 * 1000))
                    };

                    for (let j = 0; j < branchNames.length; j++) {
                        item[branchNames[j]] = data.branches[branchNames[j]].clicksLastYear[i] || 0;
                    }
                    dataSetYear.push(item);
                }
                x.data = dataSetYear;
                x.dateFormatter.dateFormat = "dd/MM/yyyy";
                break;
        }

        // Create axes
        var dateAxis = x.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 30;
        dateAxis.renderer.labels.template.rotation = -45;
        dateAxis.renderer.labels.template.horizontalCenter = "right";

        var valueAxis = x.yAxes.push(new am4charts.ValueAxis());

        // Create series
        function createSeries(field: any, name: any) {
            var series = x.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = field;
            series.dataFields.dateX = "date";
            series.name = name;
            series.tooltipText = "{dateX}: [b]{valueY}[/]";
            series.strokeWidth = 2;

            var bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.stroke = am4core.color("#fff");
            bullet.circle.strokeWidth = 2;

            return series;
        }

        for (let i = 0; i < branchNames.length; i++) {
            createSeries(branchNames[i], branchNames[i]);
        }

        x.legend = new am4charts.Legend();
        x.cursor = new am4charts.XYCursor();

        lineChart.current = x;

        return () => {
            x.dispose();
        };
    }, [data, selectedPeriod]);

    return (
        <div className={classes.charts}>
            <div className={classes.charts__title}>Статистика по периодам</div>

            <div className={classes.chart}>
                <div className={classes.chart__title}>Количество посещении по филиалам</div>
                <div className={classes.chart__inner}>
                    <div id={"pieChart"} style={{width: '100%', height: '100%'}}></div>
                </div>
            </div>

            <div className={classes.chart} style={{marginBottom: '200px'}}>
                <div className={classes.chart__title}>Количество посещении по периодам</div>
                <div className={classes.chart__inner}>
                    <ChartButtons period={selectedPeriod} setPeriod={setSelectedPeriod}/>
                    <div id={"lineChart"} style={{width: '100%', height: '100%'}}></div>
                </div>
            </div>
        </div>
    );
});

export default Charts;
