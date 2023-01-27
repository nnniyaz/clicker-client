import React, {useContext, useEffect, useRef} from 'react';
import {IBranch} from "../../models/IBranch";
import {ReactComponent as TrashIcon} from "../../assets/icons/trash.svg";
import {observer} from "mobx-react-lite";
import Button from "../Button/Button";
import classes from "./BranchItem.module.scss";
import {Context} from "../../index";

const BranchItem = observer(({branch}: { branch: IBranch }) => {
    const {store} = useContext(Context);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const wrapperRef: any = useRef(null);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsModalVisible(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        if (isModalVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isModalVisible]);

    const handleDeleteBranch = async () => {
        setIsModalVisible(false);

        await store.deleteBranch(branch._id);
    }

    return (
        <>
            <div className={classes.branch}>
                <TrashIcon className={classes.branch__icon} onClick={() => setIsModalVisible(true)}/>
                <div className={classes.branch__name}>{branch.name}</div>
                <div className={classes.branch__created__at}>
                    {`Дата добавления: ${new Date(branch.createdAt).toLocaleString() || '-'}`}
                </div>
                <div className={classes.branch__clicks__number}>{branch.clicksNumber || 0}</div>
            </div>

            {
                isModalVisible && (
                    <div className={classes.modal}>
                        <div className={classes.modal__body} ref={wrapperRef}>
                            <div className={classes.modal__title}>Вы действительно хотите удалить филиал?</div>
                            <div className={classes.modal__buttons}>
                                <Button text={'Отмена'} action={() => setIsModalVisible(false)}/>
                                <Button text={'Удалить'} action={() => handleDeleteBranch()}/>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
});

export default BranchItem;
