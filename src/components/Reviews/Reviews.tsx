import {FC, KeyboardEvent, useEffect, useState} from 'react';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import './reviews.css';
import {useContent} from '../../content';
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion';
import {Container, Reveal, SectionTitle} from '../ui';

const Reviews: FC = () => {
    const {content} = useContent();
    const reviews = content.home.reviews;
    const items = reviews.items;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    const getPreviousIndex = (index: number) => (index - 1 + items.length) % items.length;
    const getNextIndex = (index: number) => (index + 1) % items.length;

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

    const handleReviewSelect = (index: number) => {
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }
    };

    const handleReviewKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleReviewSelect(index);
        }
    };

    useEffect(() => {
        if (currentIndex >= items.length) {
            setCurrentIndex(Math.max(0, items.length - 1));
        }
    }, [currentIndex, items.length]);

    useEffect(() => {
        if (prefersReducedMotion || isPaused || items.length < 2) {
            return;
        }

        const autoplayId = window.setInterval(() => {
            setCurrentIndex(index => (index + 1) % items.length);
        }, 6800);

        return () => window.clearInterval(autoplayId);
    }, [isPaused, items.length, prefersReducedMotion]);

    return (
        <section className="reviews td-section">
            <Container className="reviews__container">
                <Reveal>
                    <SectionTitle
                        align="center"
                        inverse
                        eyebrow={reviews.eyebrow}
                        title={reviews.title}
                        description={reviews.description}
                    />
                </Reveal>
                {items.length > 0 && (
                    <div
                        className="reviews-carousel"
                        onBlur={() => setIsPaused(false)}
                        onFocus={() => setIsPaused(true)}
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <button
                            aria-label="Попередній відгук"
                            className="reviews-carousel__nav reviews-carousel__nav--prev"
                            onClick={showPrevious}
                            type="button"
                        >
                            <ChevronLeftRoundedIcon/>
                        </button>

                        <div className="reviews-carousel__track" aria-live="polite">
                            {items.map((review, index) => {
                                const position = getSlidePosition(index);

                                return (
                                    <article
                                        aria-label={index === currentIndex ? `Активний відгук: ${review.name}` : `Показати відгук: ${review.name}`}
                                        className={`review-card review-card--${position}`}
                                        key={`${review.name}-${index}`}
                                        onClick={() => handleReviewSelect(index)}
                                        onKeyDown={(event) => handleReviewKeyDown(event, index)}
                                        onPointerDown={() => handleReviewSelect(index)}
                                        role="button"
                                        tabIndex={position === 'hidden' ? -1 : 0}
                                    >
                                        <div className="review-card__top">
                                            <img src={review.image.src} alt={review.image.alt || `Фото пацієнта ${review.name}`} loading="lazy"/>
                                            <div>
                                                <h3>{review.name}</h3>
                                                <p>{review.source} · {review.date}</p>
                                            </div>
                                        </div>
                                        <div className="review-card__rating" aria-label={`Оцінка ${review.rating} з 5`}>
                                            {Array.from({length: review.rating}).map((_, starIndex) => (
                                                <StarRoundedIcon fontSize="small" key={starIndex}/>
                                            ))}
                                        </div>
                                        <p className="review-card__comment">“{review.comment}”</p>
                                    </article>
                                );
                            })}
                        </div>

                        <button
                            aria-label="Наступний відгук"
                            className="reviews-carousel__nav reviews-carousel__nav--next"
                            onClick={showNext}
                            type="button"
                        >
                            <ChevronRightRoundedIcon/>
                        </button>

                        <div className="reviews-carousel__dots" role="tablist" aria-label="Відгуки пацієнтів">
                            {items.map((review, index) => (
                                <button
                                    aria-label={`Показати відгук ${index + 1}: ${review.name}`}
                                    aria-selected={index === currentIndex}
                                    className={index === currentIndex ? 'is-active' : ''}
                                    key={`${review.name}-dot-${index}`}
                                    onClick={() => setCurrentIndex(index)}
                                    role="tab"
                                    type="button"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
};

export {Reviews};
