import {FC} from 'react';

import '../../styles/about-1.css';
import aboutImg_1 from "../../assets/images/img_4.png";

const AboutFirstPerson: FC = () => {
    return (
        <section className="about-1">
            <div className="main__container">
                <div className="about-1__image">
                    <img src={aboutImg_1} alt="image-1"/>
                </div>
                <div className="about-1__description">
                    <h2>Тарас Петрович</h2>
                    <p>
                        Справжній професіонал своєї справи з багаторічним досвідом. Завдяки його майстерності і
                        увазі до
                        деталей, наші пацієнти отримують найвищий рівень обслуговування та чудові результати.
                    </p>
                    <ul className="about-1__list list">
                        <li>Особливості:</li>
                        <li className="list__item">✔️ Висококваліфікований фахівець</li>
                        <li className="list__item">✔️ Індивідуальний підхід до кожного пацієнта</li>
                        <li className="list__item">✔️ Використання сучасних технологій та методик</li>
                        <li className="list__item">✔️ Використання сучасних технологій та методик</li>
                        <li className="list__item">✔️ Дбайливе ставлення до пацієнтів</li>
                    </ul>
                    <ul className="about-1__list list">
                        <li>Тарас Петрович працює в багатьох напрямках стоматології, включаючи:</li>
                        <li className="list__item">☑️ Хірургічну стоматологію</li>
                        <li className="list__item">☑️ Ортопедичну стоматологію</li>
                        <li className="list__item">☑️ Естетичну стоматологію</li>
                        <li className="list__item">☑️ Імплантологію</li>
                        <li className="list__item">☑️ Реконструктивну стоматологію</li>
                    </ul>
                    <p>
                        Запишіться на консультацію вже сьогодні і відчуйте різницю!
                        Ваше здоров'я - наш пріоритет!
                    </p>
                </div>
            </div>
        </section>
    );
};

export {AboutFirstPerson};