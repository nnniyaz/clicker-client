import React, {FC, useContext, useEffect, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {IStat} from "../models/IStat";
import {IStats} from "../models/IStats";

import PageAnimation from "../components/PageAnimation/PageAnimation";
import Loader from "../components/Loader/Loader";
import Stats from "../components/Stats/Stats";
import Branches from "../components/Branches/Branches";
import Charts from "../components/Charts/Charts";
import {ReactComponent as ArrowCircleIcon} from "../assets/icons/arrow-circle-left.svg";
import {ReactComponent as PlusIcon} from "../assets/icons/plus-circle.svg";

import 'react-tabs/style/react-tabs.css';
import classes from '../styles/Admin.module.scss';

const Admin: FC = observer(() => {
    const {store} = useContext(Context);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [data, setData] = useState<IStats | null>(null);

    const stats: IStat[] = useMemo(() => [
        {
            label: 'Всего филиалов',
            value: data?.branchesNumber || 0
        },
        {
            label: 'Всего посетителей',
            value: data?.totalClicksNumber || 0
        }
    ], [data]);

    const fetchBranches = async () => {
        setIsLoading(true);

        await store.getAllBranches().finally(() => {
            setIsLoading(false);
        });
    }

    const fetchStats = async () => {
        setIsLoading(true);

        const res: IStats | null = await store.getStats() || null;

        setData(res);
    }

    useEffect(() => {
        fetchBranches();
        fetchStats();
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
                            :
                            (
                                <div className={classes.container__inner}>
                                    <Stats stats={stats}/>
                                    <Tabs className={classes.tabs} selectedTabClassName={classes.tab__active}>
                                        <TabList className={classes.tabList}>
                                            <Tab className={classes.tab}>Филиалы</Tab>
                                            <Tab className={classes.tab}>Статистика по периодам</Tab>
                                        </TabList>

                                        <TabPanel className={classes.tabPanel}>
                                            <Branches branches={store.getBranches()}/>
                                        </TabPanel>
                                        <TabPanel className={classes.tabPanel}>
                                            <Charts data={data}/>
                                        </TabPanel>
                                    </Tabs>
                                </div>
                            )
                    }
                </div>
            </div>
        </PageAnimation>
    );
});

export default Admin;
