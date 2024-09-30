import React, {FC} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, A11y, Autoplay} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './image-slider.css';
import {sliderImages} from "../../constants";

const ImageSlider: FC = () => {
    return (
        <section className="slider">
            <div className="slider__container">
                <h2>Фото</h2>
                <Swiper
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    navigation={true}
                    pagination={{clickable: true}}
                    spaceBetween={50}
                    slidesPerView={3}
                    autoplay={{delay: 3000}}
                >
                    {sliderImages.map((el, index) => (
                        <SwiperSlide key={index}>
                            <img src={el} alt="slide-photo"/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export {ImageSlider};