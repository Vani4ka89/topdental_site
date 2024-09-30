import React, {FC} from 'react';

import {Swiper, SwiperSlide} from 'swiper/react';
import {A11y, Navigation} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import './reviews.css';
import {person} from "../../constants";

const Reviews: FC = () => {
    return (
        <section className="reviews">
            <div className="reviews__container">
                <div className="reviews__content">
                    <h2>Що кажуть наші пацієнти</h2>
                    <p>Нам приємно отримувати подяку від пацієнтів</p>
                </div>
                <Swiper
                    modules={[Navigation, A11y]}
                    navigation={true}
                    slidesPerView={1}
                >
                    {person.map((el, index) => (
                        <SwiperSlide key={index}>
                            <img src={el.img} alt={el.name}/>
                            <h4>{el.name}</h4>
                            <p className="comment">{el.comment}</p>
                            <p className="date">{el.date}</p>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export {Reviews};