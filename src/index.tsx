import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";

import {ContentProvider} from './content';
import {router} from "./router";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ContentProvider>
        <RouterProvider router={router}/>
    </ContentProvider>
);
