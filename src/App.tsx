import React, {useContext, useEffect} from 'react';
import ErrorBoundary from "./pages/ErrorBoundary";
import {Outlet} from "react-router-dom";
import {ReactNotifications} from 'react-notifications-component';

import './App.css';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import 'animate.css/animate.compat.css'
import {observer} from "mobx-react-lite";
import {Context} from "./index";

const App = observer(() => {
    const {store} = useContext(Context);

    const fetchBranches = async () => {
        await store.getAllBranches();
    }

    useEffect(() => {
        fetchBranches();
    }, []);

    return (
        <div className="App">
            <ReactNotifications/>
            <ErrorBoundary>
                <Outlet/>
            </ErrorBoundary>
        </div>
    );
});

export default App;
