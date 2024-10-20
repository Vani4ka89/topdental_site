import {FC} from 'react';

import './about-second-person.css';
import aboutImg_2 from "../../assets/images/img_5.jpeg";

const AboutSecondPerson: FC = () => {
    return (
        <section className="about-second">
            <div className="about-second__container">
                <div className="about-second__image">
                    <img src={aboutImg_2} alt="image-second"/>
                </div>
                <div className="about-second__description">
                    <h2>Яна Вікторівна</h2>
                    <p>
                        Усмішка вашої мрії починається з професійного ортодонта у клініці TopDental.
                    </p>
                    <p>
                        Познайомтесь з нашим талановитим лікарем - ортодонтом, Яною Вікторівною!
                        Професіоналізм і турбота - це те, що ми гарантуємо кожному пацієнту!
                    </p>
                    <ul className="about-second__list list">
                        <li className="list__item">☑️ Виправлення прикусу</li>
                        <li className="list__item">☑️ Вирівнювання зубів за допомогою сучасних методів</li>
                        <li className="list__item">☑️ Лікування брекетами та елайнерами</li>
                        <li className="list__item">☑️ Індивідуальний підхід та комфорт</li>
                    </ul>
                    <p>
                        Зробіть перший крок до впевненої усмішки - запишіться на консультацію до нашого ортодонта!
                    </p>
                </div>
            </div>
        </section>
    );
};

export {AboutSecondPerson};