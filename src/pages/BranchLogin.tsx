import React, {FC, useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {ReactComponent as ArrowCircleIcon} from "../assets/icons/arrow-circle-left.svg";
import {Context} from "../index";

import Select from "react-select";
import PageAnimation from "../components/PageAnimation/PageAnimation";
import Button from "../components/Button/Button";
import Loader from "../components/Loader/Loader";

import classes from '../styles/BranchLogin.module.scss';

const BranchLogin: FC = observer(() => {
    const {store} = useContext(Context);
    const navigate = useNavigate();
    const defaultOptionLabel: string = 'Выберите филиал';
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedBranch, setSelectedBranch] = useState<{ value: string, label: string }>({
        value: 'default',
        label: defaultOptionLabel
    });

    const [options, setOptions] = useState<{ value: string, label: string }[]>([]);

    const fetchBranches = async () => {
        setIsLoading(true);

        await store.getAllBranches().finally(() => {
            const branches = store.getBranches()?.map(branch => {
                return {
                    value: branch.name,
                    label: branch.name
                }
            }) || [];

            setOptions(
                [
                    {value: 'default', label: defaultOptionLabel},
                    ...branches
                ]
            );
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchBranches();
    }, []);

    const changeSelect = ({value, label}: { value: string | undefined, label: string | undefined }) => {
        if (value && label) {
            setSelectedBranch({value: value, label: label})
        }
    }

    const handleSubmit = (branchName: string) => {
        if (!branchName || branchName === 'default') {
            return;
        }

        navigate(`/branch/${branchName}`);
    }

    return (
        <PageAnimation>
            <div className={classes.main}>
                {
                    isLoading
                        ? <Loader/>
                        :
                        (
                            <div className={classes.container}>
                                <div className={classes.container__header}>
                                    <Link to={'/'} className={classes.container__header__button}>
                                        <ArrowCircleIcon className={classes.container__header__button__icon}/>
                                        <div className={classes.container__header__button__text}>Назад</div>
                                    </Link>
                                </div>

                                <div className={classes.container__inner}>
                                    <div className={classes.container__title}>Выберите ваш филиал</div>
                                    <Select
                                        value={selectedBranch}
                                        onChange={(e) => changeSelect({value: e?.value, label: e?.label})}
                                        options={options}
                                        placeholder={'Ваш филиал'}
                                        noOptionsMessage={() => 'Филиал не найден'}
                                        className={classes.container__select}
                                    />
                                    <Button text={'Войти'} action={() => handleSubmit(selectedBranch.value)}/>
                                </div>
                            </div>
                        )
                }
            </div>
        </PageAnimation>
    );
});

export default BranchLogin;
