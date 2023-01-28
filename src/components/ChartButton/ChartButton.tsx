import React from 'react';
import {Period} from "../Charts/Charts";

import classes from "./ChartButton.module.scss";
import {observer} from "mobx-react-lite";

interface IProps {
    value: Period,
    label: string,
    period: Period,
    setPeriod: (period: Period) => void
}

const ChartButton = observer(({value, label, period, setPeriod}: IProps) => {
    return (
        <div
            className={classes.chart__button}
            onClick={() => setPeriod(value)}
            style={{
                backgroundColor: period === value ? '#1A56DB' : '',
                color: period === value ? '#fff' : ''
            }}
        >
            {label}
        </div>
    );
});

export default ChartButton;
