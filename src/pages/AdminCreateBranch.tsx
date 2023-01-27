import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

import Button from "../components/Button/Button";
import {ReactComponent as ArrowCircleIcon} from "../assets/icons/arrow-circle-left.svg";

import classes from '../styles/AdminCreateBranch.module.scss';
import PageAnimation from "../components/PageAnimation/PageAnimation";

const AdminCreateBranch = observer(() => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

    const [branchName, setBranchName] = React.useState<string>('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!branchName) return;

        const isCreated = await store.addBranch(branchName);

        if (isCreated) {
            navigate('/admin')
        }
    }

    return (
        <PageAnimation>
            <div className={classes.main}>
                <div className={classes.container}>
                    <div className={classes.container__header}>
                        <Link to={'/admin'} className={classes.container__header__button}>
                            <ArrowCircleIcon className={classes.container__header__button__icon}/>
                            <div className={classes.container__header__button__text}>Назад</div>
                        </Link>
                    </div>

                    <div className={classes.container__inner}>
                        <div className={classes.container__title}>Добавьте новый филиал</div>
                        <form className={classes.container__form} onSubmit={handleSubmit}>
                            <input
                                value={branchName}
                                onChange={(e) => setBranchName(e.target.value)}
                                placeholder={'Название филиала'}
                                className={classes.container__input}
                                required
                            />
                            <Button text={'Добавить'}/>
                        </form>
                    </div>
                </div>
            </div>
        </PageAnimation>
    );
});

export default AdminCreateBranch;
