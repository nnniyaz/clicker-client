import React from 'react';
import {IStat} from "../../models/IStat";

import classes from "./StatItem.module.scss";

function StatItem({value, label}: IStat) {
    return (
        <div className={classes.stats__item}>
            <div className={classes.stats__item__value}>{value}</div>
            <div className={classes.stats__item__label}>{label}</div>
        </div>
    );
}

export default StatItem;
