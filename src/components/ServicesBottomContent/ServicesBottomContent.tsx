import {FC} from 'react';
import {HashLink} from "react-router-hash-link";

import './services-bottom.content.css';

const ServicesBottomContent: FC = () => {
    return (
        <section className="consultation-content">
            <div className="consultation-content__container">
                <div className="content-block">
                    <h2>Хочете надіслати запит на консультацію?</h2>
                    <p>
                        Не соромтеся зв’язатися з нами, щоб отримати перший безкоштовний запит на первинну
                        консультацію лікаря.
                    </p>
                    <HashLink to="/home#recording" className="btn">Консультація</HashLink>
                </div>
            </div>
        </section>
    );
};

export {ServicesBottomContent};