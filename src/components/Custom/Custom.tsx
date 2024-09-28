import {FC} from 'react';
import {Link} from "react-router-dom";

import '../../styles/custom.css';

const Custom: FC = () => {
    return (
        <section className="custom">
            <div className="custom__container">
                <Link to='#contact' className="btn">
                    Записатись на прийом →
                </Link>
            </div>
        </section>
    );
};

export {Custom};