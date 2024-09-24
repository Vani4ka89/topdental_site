import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AboutPage, ContactsPage, HomePage, ServicesPage} from "./pages";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'home'}/>},
            {path: 'home', element: <HomePage/>},
            {path: 'about', element: <AboutPage/>},
            {path: 'services', element: <ServicesPage/>},
            {path: 'contacts', element: <ContactsPage/>}
        ]
    }
]);

export {router};