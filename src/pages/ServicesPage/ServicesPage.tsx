import {FC} from 'react';

import {Services} from "../../components";
import {ServicesBottomContent} from "../../components/ServicesBottomContent/ServicesBottomContent";

const ServicesPage: FC = () => {
    return (
        <main className="main">
            <Services/>
            <ServicesBottomContent/>
        </main>
    );
};

export {ServicesPage};
