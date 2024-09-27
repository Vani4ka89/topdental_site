import {FC} from 'react';
import {Link} from "react-router-dom";

import '../../styles/custom.css';

const Custom: FC = () => {
    return (
        <section className="custom">
            <div className="main__container block-1">
                <Link to='#contact' className="btn btn-1">Записатись на прийом →</Link>
            </div>
        </section>
    );
};

export {Custom};