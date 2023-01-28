import React from 'react';
import {Period} from "../Charts/Charts";
import ChartButton from "../ChartButton/ChartButton";

import classes from "./ChartButtons.module.scss";
import {observer} from "mobx-react-lite";

const ChartButtons = observer(({period, setPeriod}: { period: Period, setPeriod: (period: Period) => void }) => {
    return (
        <div className={classes.chart__buttons}>
            {
                [
                    ['TODAY', 'Сегодня'],
                    ['WEEK', 'Неделя'],
                    ['MONTH', 'Месяц'],
                    ['3MONTH', '3 месяца'],
                    ['YEAR', 'Год'],
                ].map((item) => {
                    return (
                        <ChartButton
                            value={item[0] as Period}
                            label={item[1]}
                            period={period}
                            setPeriod={setPeriod}
                            key={item[0]}
                        />
                    )
                })
            }
        </div>
    );
});

export default ChartButtons;
