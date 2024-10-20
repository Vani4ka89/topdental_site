import {createBrowserRouter} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AboutPage, ContactsPage, HomePage, ServicesPage} from "./pages";

const router = createBrowserRouter([
    {
        element: <MainLayout/>, children: [
            {path: '', element: <HomePage/>},
            {path: 'about', element: <AboutPage/>},
            {path: 'services', element: <ServicesPage/>},
            {path: 'contacts', element: <ContactsPage/>}
        ]
    }
]);

export {router};