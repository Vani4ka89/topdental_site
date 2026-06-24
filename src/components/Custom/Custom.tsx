import {FC} from 'react';
import {HashLink} from "react-router-hash-link"

import './custom.css';

const Custom: FC = () => {
    return (
        <section className="custom">
            <div className="custom__container">
                <div className="custom__content">
                    <p className="custom__eyebrow">Стоматологія у Тернополі</p>
                    <h1>TopDental</h1>
                    <p className="custom__text">
                        Дбайливе лікування, сучасна діагностика та зрозумілий план для здорової усмішки.
                    </p>
                    <div className="custom__actions">
                        <HashLink to="#recording" className="btn">
                            Записатись на прийом
                        </HashLink>
                        <HashLink to="/services" className="btn btn--secondary">
                            Переглянути послуги
                        </HashLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export {Custom};
