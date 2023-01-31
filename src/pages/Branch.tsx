import React, {FC, useContext, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

import PageAnimation from "../components/PageAnimation/PageAnimation";
import Button from "../components/Button/Button";
import {ReactComponent as ArrowCircleIcon} from "../assets/icons/arrow-circle-left.svg";

import classes from '../styles/Branch.module.scss';

const Branch: FC = observer(() => {
    const {store} = useContext(Context);

    const {name} = useParams();

    const currentBranch = store.getBranch(name) || null;

    const [disabled, setDisabled] = useState<boolean>(false);

    const handleAddClick = async () => {
        if (disabled) {
            return;
        }

        setDisabled(true);

        if (!currentBranch) {
            return;
        }

        await store.addClick(currentBranch.name).finally(() => {
            setDisabled(false);
        });
    }

    const handleRemoveClick = async () => {
        if (disabled) {
            return;
        }

        setDisabled(true);

        if (!currentBranch) {
            return;
        }

        if (currentBranch.todayClicksNumber === 0) {
            return;
        }

        await store.removeClick(currentBranch.name).finally(() => {
            setDisabled(false);
        });
    }

    return (
        <PageAnimation>
            <div className={classes.main}>
                <div className={classes.container}>
                    <div className={classes.container__header}>
                        <Link to={'/'} className={classes.container__header__button}>
                            <ArrowCircleIcon className={classes.container__header__button__icon}/>
                            <div className={classes.container__header__button__text}>Выйти</div>
                        </Link>
                    </div>

                    {
                        ((name !== null && name !== undefined) && !!currentBranch?.name?.length)
                            ?
                            (
                                <div className={classes.container__inner}>
                                    <div className={classes.container__subtitle}>{currentBranch.name || '-'}</div>
                                    <div className={classes.container__subtitle}>Количество кликов за сегодня</div>
                                    <div className={classes.container__title}>{currentBranch.todayClicksNumber || 0}</div>
                                    <div className={classes.container__row} style={{
                                        pointerEvents: disabled ? 'none' : 'auto',
                                        opacity: disabled ? 0.5 : 1
                                    }}>
                                        <Button text={'Добавить'} action={() => handleAddClick()}/>
                                        <Button text={'Убрать'} action={() => handleRemoveClick()} color={'red'}/>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className={classes.container__message}>
                                    <div className={classes.message}>Нет филиала</div>
                                </div>
                            )
                    }
                </div>
            </div>
        </PageAnimation>
    );
});

export default Branch;
