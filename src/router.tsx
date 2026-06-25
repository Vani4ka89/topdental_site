import {lazy, Suspense} from "react";
import {createBrowserRouter} from "react-router-dom";

import {MainLayout} from "./layouts";

const HomePage = lazy(() => import("./pages/HomePage/HomePage").then(module => ({default: module.HomePage})));
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage").then(module => ({default: module.AboutPage})));
const ServicesPage = lazy(() => import("./pages/ServicesPage/ServicesPage").then(module => ({default: module.ServicesPage})));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage").then(module => ({default: module.ContactsPage})));
const AdminPage = lazy(() => import("./pages/AdminPage/AdminPage").then(module => ({default: module.AdminPage})));

const page = (element: JSX.Element) => (
    <Suspense fallback={<div className="route-loader" role="status">Завантаження сторінки...</div>}>
        {element}
    </Suspense>
);

const router = createBrowserRouter([
    {
        element: <MainLayout/>, children: [
            {path: '', element: page(<HomePage/>)},
            {path: 'about', element: page(<AboutPage/>)},
            {path: 'services', element: page(<ServicesPage/>)},
            {path: 'contacts', element: page(<ContactsPage/>)},
            {path: 'admin', element: page(<AdminPage/>)}
        ]
    }
]);

export {router};
