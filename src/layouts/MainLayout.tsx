import {FC} from 'react';
import {Outlet} from "react-router-dom";

import {Footer, Header} from "../components";
import '../styles/common.css';

const MainLayout: FC = () => {
    return (
        <div className="wrapper">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export {MainLayout};
