import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Store from "./store/store";
import App from './App';
import Home from "./pages/Home";
import Branch from "./pages/Branch";
import BranchLogin from "./pages/BranchLogin";
import Admin from "./pages/Admin";
import AdminCreateBranch from "./pages/AdminCreateBranch";
import AdminEditBranch from "./pages/AdminEditBranch";

interface State {
    store: Store;
}

const store = new Store();
export const Context = createContext<State>({store});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Context.Provider value={{store}}>
            <BrowserRouter>
                <Routes>
                    <Route element={<App/>}>
                        <Route index element={<Home/>}/>
                        <Route path={'branch/login'} element={<BranchLogin/>}/>
                        <Route path={`branch/:name`} element={<Branch/>}/>
                        <Route path={'admin'} element={<Admin/>}/>
                        <Route path={'admin/add'} element={<AdminCreateBranch/>}/>
                        <Route path={'admin/edit/:name'} element={<AdminEditBranch/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    </React.StrictMode>
);
