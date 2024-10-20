import {FC} from 'react';

import './services.css';

import tooth from "../../assets/images/tooth-icon.png";

const Services: FC = () => {
    return (
        <section className="service">
            <h1 className="services-title">Наші послуги</h1>
            <div className="service-wrapper">
                <div className="service-item">
                    <img src={tooth} alt="Зуб" className="tooth-icon"/>
                    <strong>Професійна гігієна ротової порожнини</strong>
                </div>
                <div className="service-item">
                    <img src={tooth} alt="Зуб" className="tooth-icon"/>
                    <strong>Лікування зубів:</strong>
                    <ul>
                        <li>Герметизація фісур</li>
                        <li>Лікування карієсу</li>
                        <li>Лікування кореневих каналів</li>
                    </ul>
                </div>
                <div className="service-item">
                    <img src={tooth} alt="Зуб" className="tooth-icon"/>
                    <strong>Протезування:</strong>
                    <ul>
                        <li>Металокерамічні коронки</li>
                        <li>Керамічні коронки</li>
                        <li>Цирконієві коронки</li>
                        <li>Зубні протези</li>
                    </ul>
                </div>
                <div className="service-item">
                    <img src={tooth} alt="Зуб" className="tooth-icon"/>
                    <strong>Ортодонтія дитячого та дорослого віку:</strong>
                    <ul>
                        <li>Пластинки</li>
                        <li>Брекети</li>
                        <li>Елайнери</li>
                    </ul>
                </div>
                <div className="service-item">
                    <img src={tooth} alt="Зуб" className="tooth-icon"/>
                    <strong>Лікування кореневих каналів</strong>
                </div>
                <div className="service-item">
                    <img src={tooth} alt="Зуб" className="tooth-icon"/>
                    <strong>Видалення зубів</strong>
                </div>
                <div className="service-item">
                    <img src={tooth} alt="Зуб" className="tooth-icon"/>
                    <strong>Видалення зубів мудрості</strong>
                </div>
                <div className="service-item">
                    <img src={tooth} alt="Зуб" className="tooth-icon"/>
                    <strong>Імплантація</strong>
                </div>
            </div>
        </section>
    );
};

export {Services};
