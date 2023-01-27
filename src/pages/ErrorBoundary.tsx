import React, {ErrorInfo} from 'react';
import classes from '../styles/ErrorBoundary.module.scss';

class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        // @ts-ignore
        if (this.state.hasError) {
            // Можно отрендерить запасной UI произвольного вида
            return (
                <div className={classes.main}>
                    <div className={classes.container}>
                        <div className={classes.status}>404</div>
                        <div className={classes.message}>Упс! Что-то пошло не так...</div>
                        <div className={classes.sub__message}>Пожалуйста перезагрузите страницу</div>
                    </div>
                </div>
            );
        }

        // @ts-ignore
        return this.props.children;
    }
}

export default ErrorBoundary;
