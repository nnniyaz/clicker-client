import React from 'react';
import Button from "../components/Button/Button";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import PageAnimation from "../components/PageAnimation/PageAnimation";

import {ReactComponent as ClickIcon} from "../assets/icons/cursor-click.svg";
import classes from '../styles/Home.module.scss';

const Home = observer(() => {
    const navigate = useNavigate();

    const goToRoute = (path: string) => {
        navigate(path);
    }

    return (
        <PageAnimation>
            <div className={classes.main}>
                <div className={classes.container}>
                    <div className={classes.title}>
                        <h1 className={classes.title__text}>Clicker</h1>
                        <ClickIcon className={classes.title__icon}/>
                    </div>
                    <div className={classes.container__row}>
                        <Button text={'Зайти в свой филиал'} action={() => goToRoute('branch/login')}/>
                        <Button text={'Посмотреть статистику'} action={() => goToRoute('admin')}/>
                    </div>
                </div>
            </div>
        </PageAnimation>
    );
});

export default Home;
