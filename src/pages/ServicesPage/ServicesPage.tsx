import {FC} from 'react';

import {Services, ServicesBottomContent} from "../../components";

const ServicesPage: FC = () => {
    return (
        <main className="main">
            <Services/>
            <ServicesBottomContent/>
        </main>
    );
};

export {ServicesPage};
