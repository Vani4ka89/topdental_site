import {FC} from 'react';

import '../../styles/services.css';

const Services: FC = () => {
    return (
        <section className="service">
            <div className="services-container">
                <h1 className="services-title">Наші послуги</h1>
                <div className="service-category">
                    <h2>Професійна гігієна ротової порожнини</h2>
                </div>

                <div className="service-category">
                    <h2>Лікування зубів:</h2>
                    <ul>
                        <li>Герметизація фісур</li>
                        <li>Лікування карієсу</li>
                        <li>Лікування кореневих каналів</li>
                    </ul>
                </div>

                <div className="service-category">
                    <h2>Видалення зубів</h2>
                </div>

                <div className="service-category">
                    <h2>Видалення зубів мудрості</h2>
                </div>

                <div className="service-category">
                    <h2>Імплантація</h2>
                </div>

                <div className="service-category">
                    <h2>Протезування:</h2>
                    <ul>
                        <li>Металокерамічні коронки</li>
                        <li>Керамічні коронки</li>
                        <li>Цирконієві коронки</li>
                        <li>Зубні протези</li>
                    </ul>
                </div>

                <div className="service-category">
                    <h2>Ортодонтія дитячого та дорослого віку:</h2>
                    <ul>
                        <li>Пластинки</li>
                        <li>Брекети</li>
                        <li>Елайнери</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export {Services};
