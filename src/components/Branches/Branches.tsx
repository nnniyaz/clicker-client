import React from 'react';
import {observer} from "mobx-react-lite";
import {IBranch} from "../../models/IBranch";
import {useNavigate} from "react-router-dom";

import BranchItem from "../BranchItem/BranchItem";
import Button from "../Button/Button";

import classes from "./Branches.module.scss";

const Branches = observer(({branches}: { branches: IBranch[]}) => {
    const navigate = useNavigate();
    return (
        <div className={classes.branches}>
            <div className={classes.branches__title}>Филиалы</div>
            {
                branches?.length > 0
                    ?
                    (
                        branches.map((branch, index) => (
                            <BranchItem branch={branch} key={index}/>
                        ))
                    )
                    :
                    (
                        <div className={classes.main}>
                            <div className={classes.message}>Нет филиалов</div>
                            <Button text={'Добавить филиал'} action={() => navigate('add')}/>
                        </div>
                    )
            }
        </div>
    );
});

export default Branches;
