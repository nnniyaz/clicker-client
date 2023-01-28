import React from 'react';
import {observer} from "mobx-react-lite";
import {IStat} from "../../models/IStat";

import StatItem from "../StatItem/StatItem";

import classes from "./Stats.module.scss";

const Stats = observer(({stats}: { stats: IStat[] }): JSX.Element => {
    return (
        <div className={classes.stats__wrapper}>
            <div className={classes.stats__title}>Общая статистика</div>
            <div className={classes.stats}>
                {
                    stats.map((stat, index) => {
                        return <StatItem key={index} value={stat.value} label={stat.label}/>
                    })
                }
            </div>
        </div>
    );
});

export default Stats;
