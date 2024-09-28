import {FC} from 'react';
import {Link} from "react-router-dom";

import '../../styles/custom.css';

const Custom: FC = () => {
    const handleScroll = () => {
        const element = document.getElementById("contact");
        element?.scrollIntoView({behavior: 'smooth'});
    };

    return (
        <section className="custom">
            <div className="custom__container">
                <Link to="#" onClick={handleScroll} className="btn">
                    Записатись на прийом →
                </Link>
            </div>
        </section>
    );
};

export {Custom};