import React from 'react';

import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import slide1 from '../../assets/images/img_6.jpeg';
import slide2 from '../../assets/images/img_7.jpeg';
import slide3 from '../../assets/images/img_8.jpeg';
// import {A11y, Navigation, Pagination, Scrollbar} from "swiper/types/modules";

const ImageSlider = () => {
    return (
        <section className="slider">
            <div className="main__container">
                <Swiper
                    // modules={[Navigation, Pagination, Scrollbar, A11y]}
                    navigation
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{delay: 2500}}>
                    <SwiperSlide>
                        <img src={slide1} alt="Slide 1"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide2} alt="Slide 2"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide3} alt="Slide 3"/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
};

export default ImageSlider;