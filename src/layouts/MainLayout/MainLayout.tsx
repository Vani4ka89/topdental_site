import {FC, useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";

import {Footer, Header} from "../../components";
import './main-layout.css';

const MainLayout: FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (!location.hash) {
            window.scrollTo({top: 0, behavior: 'instant' as ScrollBehavior});
        }
    }, [location.pathname, location.hash]);

    return (
        <div className="wrapper">
            <Header/>
            <div className="page-shell" key={location.pathname}>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export {MainLayout};
