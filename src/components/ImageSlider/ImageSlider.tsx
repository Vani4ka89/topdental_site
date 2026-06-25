import {FC, MouseEvent, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloseIcon from '@mui/icons-material/Close';

import './image-slider.css';
import {EditableImage, useContent} from '../../content';
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion';
import {Container, Reveal, SectionTitle} from '../ui';

const ImageSlider: FC = () => {
    const {content} = useContent();
    const slider = content.home.slider;
    const sliderImages = slider.images;
    const [activeImage, setActiveImage] = useState<EditableImage | null>(null);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    const getPreviousIndex = (index: number) => (index - 1 + sliderImages.length) % sliderImages.length;
    const getNextIndex = (index: number) => (index + 1) % sliderImages.length;

    const handleSlideClick = (event: MouseEvent<HTMLButtonElement>, image: EditableImage, index: number) => {
        event.currentTarget.blur();

        if (index === currentIndex) {
            setActiveImage(image);
            return;
        }

        setCurrentIndex(index);
    };

    const showPrevious = () => setCurrentIndex(index => getPreviousIndex(index));
    const showNext = () => setCurrentIndex(index => getNextIndex(index));

    const getSlidePosition = (index: number) => {
        if (index === currentIndex) {
            return 'active';
        }

        if (index === getPreviousIndex(currentIndex)) {
            return 'prev';
        }

        if (index === getNextIndex(currentIndex)) {
            return 'next';
        }

        return 'hidden';
    };

    useEffect(() => {
        if (currentIndex >= sliderImages.length) {
            setCurrentIndex(Math.max(0, sliderImages.length - 1));
        }
    }, [currentIndex, sliderImages.length]);

    useEffect(() => {
        if (!activeImage) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActiveImage(null);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeImage]);

    useEffect(() => {
        if (prefersReducedMotion || isPaused || activeImage || sliderImages.length < 2) {
            return;
        }

        const autoplayId = window.setInterval(() => {
            setCurrentIndex(index => (index + 1) % sliderImages.length);
        }, 5600);

        return () => window.clearInterval(autoplayId);
    }, [activeImage, isPaused, prefersReducedMotion, sliderImages.length]);

    return (
        <section className="slider td-section">
            <Container className="slider__container">
                <Reveal>
                    <SectionTitle
                        align="center"
                        eyebrow={slider.eyebrow}
                        title={slider.title}
                        description={slider.description}
                    />
                </Reveal>
                {sliderImages.length > 0 && (
                    <Reveal
                        className="slider-carousel"
                        delay={120}
                        onBlur={() => setIsPaused(false)}
                        onFocus={() => setIsPaused(true)}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <button
                            aria-label="Попереднє фото клініки"
                            className="slider-carousel__nav slider-carousel__nav--prev"
                            onClick={showPrevious}
                            type="button"
                        >
                            <ChevronLeftRoundedIcon/>
                        </button>
                        <div className="slider-carousel__track" aria-live="polite">
                            {sliderImages.map((image, index) => (
                                <button
                                    aria-label={index === currentIndex ? `Відкрити фото: ${image.alt}` : `Показати фото: ${image.alt}`}
                                    className={`slider-card slider-card--${getSlidePosition(index)}`}
                                    key={`${image.src}-${index}`}
                                    onClick={(event) => handleSlideClick(event, image, index)}
                                    type="button"
                                >
                                    <img className="slider-card__image" src={image.src} alt={image.alt} loading={index === currentIndex ? 'eager' : 'lazy'}/>
                                </button>
                            ))}
                        </div>
                        <button
                            aria-label="Наступне фото клініки"
                            className="slider-carousel__nav slider-carousel__nav--next"
                            onClick={showNext}
                            type="button"
                        >
                            <ChevronRightRoundedIcon/>
                        </button>
                        <div className="slider-carousel__dots" role="tablist" aria-label="Фото клініки">
                            {sliderImages.map((image, index) => (
                                <button
                                    aria-label={`Показати фото ${index + 1}: ${image.alt}`}
                                    aria-selected={index === currentIndex}
                                    className={index === currentIndex ? 'is-active' : ''}
                                    key={`${image.alt}-${index}`}
                                    onClick={() => setCurrentIndex(index)}
                                    role="tab"
                                    type="button"
                                />
                            ))}
                        </div>
                    </Reveal>
                )}

                {activeImage && createPortal(
                    <div className="gallery-lightbox" role="presentation" onMouseDown={() => setActiveImage(null)}>
                        <div
                            aria-label="Перегляд фото клініки"
                            aria-modal="true"
                            className="gallery-lightbox__dialog"
                            role="dialog"
                            onMouseDown={(event) => event.stopPropagation()}
                        >
                            <button
                                aria-label="Закрити фото"
                                className="gallery-lightbox__close"
                                onClick={() => setActiveImage(null)}
                                ref={closeButtonRef}
                                type="button"
                            >
                                <CloseIcon/>
                            </button>
                            <img src={activeImage.src} alt={activeImage.alt}/>
                        </div>
                    </div>,
                    document.body
                )}
            </Container>
        </section>
    );
};

export {ImageSlider};
