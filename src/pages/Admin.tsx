import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {IStat} from "../models/IStat";

import Loader from "../components/Loader/Loader";
import Stats from "../components/Stats/Stats";
import Branches from "../components/Branches/Branches";
import {ReactComponent as ArrowCircleIcon} from "../assets/icons/arrow-circle-left.svg";
import {ReactComponent as PlusIcon} from "../assets/icons/plus-circle.svg";

import classes from '../styles/Admin.module.scss';
import PageAnimation from "../components/PageAnimation/PageAnimation";

const Admin = observer(() => {
    const {store} = useContext(Context);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const stats: IStat[] = useMemo(() => [
        {
            label: 'Всего филиалов',
            value: store.getBranches().length
        },
        {
            label: 'Всего посетителей',
            value: store.getBranches().reduce((acc, branch) => {
                return acc + branch.clicksNumber;
            }, 0)
        }
    ], [store.branches])

    const fetchBranches = async () => {
        setIsLoading(true);

        await store.getAllBranches().finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchBranches()
    }, []);

    return (
        <PageAnimation>
            <div className={classes.main}>
                <div className={classes.container}>
                    <div className={classes.container__header}>
                        <Link to={'/'} className={classes.container__header__button}>
                            <ArrowCircleIcon className={classes.container__header__button__icon}/>
                            <div className={classes.container__header__button__text}>Выйти</div>
                        </Link>

                        <Link to={'add'} className={classes.container__header__button}>
                            <div className={classes.container__header__button__text}>Добавить</div>
                            <PlusIcon className={classes.container__header__button__icon}/>
                        </Link>
                    </div>

                    {
                        isLoading
                            ? <Loader/>
                            : (
                                <div className={classes.container__inner}>
                                    <Stats stats={stats}/>
                                    <Branches branches={store.getBranches()}/>
                                </div>
                            )
                    }
                </div>
            </div>
        </PageAnimation>
    );
});

export default Admin;
