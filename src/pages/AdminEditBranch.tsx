import React, {useContext, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import Button from "../components/Button/Button";
import PageAnimation from "../components/PageAnimation/PageAnimation";
import {ReactComponent as ArrowCircleIcon} from "../assets/icons/arrow-circle-left.svg";
import classes from "../styles/AdminEditBranch.module.scss";

function AdminEditBranch() {
    const {store} = useContext(Context);
    const {name} = useParams();
    const navigate = useNavigate();

    const [branchName, setBranchName] = useState<string>(name || '');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!branchName) return;

        if (!name) return;

        const branch = store.getBranch(name);

        if (!branch) return;

        const isEdited = await store.editBranch(branch._id, branchName);

        if (isEdited) {
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
                        <div className={classes.container__title}>Редактирование филиала</div>
                        <form className={classes.container__form} onSubmit={handleSubmit}>
                            <input
                                value={branchName}
                                onChange={(e) => setBranchName(e.target.value)}
                                placeholder={'Название филиала'}
                                className={classes.container__input}
                                required
                            />
                            <Button text={'Обновить'}/>
                        </form>
                    </div>
                </div>
            </div>
        </PageAnimation>
    );
}

export default AdminEditBranch;
