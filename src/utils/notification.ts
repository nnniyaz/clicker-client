import {Store} from 'react-notifications-component';

interface INotification {
    title: string;
    message: string;
    type: 'success' | 'danger' | 'info' | 'default' | 'warning';
    insert: string;
    container: string;
    animationIn: string[];
    animationOut: string[];
    dismiss: {
        duration: number;
        pauseOnHover: boolean;
        onScreen: boolean;
    };
}

export interface INotificationInputs {
    title: string;
    message: string;
    type: 'success' | 'danger' | 'info' | 'default' | 'warning';
}


export const addNotification = ({title, message, type}: INotificationInputs) => {
    const notification: INotification = {
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 8000,
            pauseOnHover: true,
            onScreen: true
        }
    };

    // @ts-ignore
    Store.addNotification(notification);
}
