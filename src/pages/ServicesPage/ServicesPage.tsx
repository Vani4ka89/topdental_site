import {FC} from 'react';

import {Services, ServicesBottomContent} from "../../components";
import {Helmet} from "react-helmet";

const ServicesPage: FC = () => {
    return (
        <main className="main">

            <Helmet>
                <title>Послуги | TopDental</title>
                <meta name="description" content="Послуги стоматологічної клініки TopDental. Ми надаємо широкий спектр стоматологічних послуг для лікування зубів, ротової порожнини та щелеп у Тернополі та Плотичі." />
                <meta name="keywords" content="стоматологія Тернопіль, стоматологічні послуги, лікування зубів, TopDental послуги" />
            </Helmet>

            <Services/>
            <ServicesBottomContent/>
        </main>
    );
};

export {ServicesPage};
