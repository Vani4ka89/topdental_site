import {FC} from 'react';
import {HashLink} from "react-router-hash-link"

import './custom.css';

const Custom: FC = () => {
    return (
        <section className="custom">
            <div className="custom__container">
                <HashLink to="#contact" className="btn">
                    Записатись на прийом →
                </HashLink>
            </div>
        </section>
    );
};

export {Custom};