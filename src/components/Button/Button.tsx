import React from 'react';
import classes from "./Button.module.scss";
import {observer} from "mobx-react-lite";

const Button = observer(({text, action, color}: { text: string, action?: any, color?: string }) => {
    return (
        <button
            className={classes.button}
            onClick={action}
            style={{backgroundColor: color === 'red' ? '#D10000' : ''}}
        >
            {text}
        </button>
    );
});

export default Button;
