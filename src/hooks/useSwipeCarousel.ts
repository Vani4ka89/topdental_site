import {TouchEvent, useRef} from 'react';

interface UseSwipeCarouselOptions {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    threshold?: number;
}

interface SwipeHandlers {
    onTouchStart: (event: TouchEvent<HTMLElement>) => void;
    onTouchMove: (event: TouchEvent<HTMLElement>) => void;
    onTouchEnd: () => void;
}

const useSwipeCarousel = ({onSwipeLeft, onSwipeRight, threshold = 40}: UseSwipeCarouselOptions): SwipeHandlers => {
    const touchStartX = useRef<number | null>(null);
    const touchDeltaX = useRef(0);

    const onTouchStart = (event: TouchEvent<HTMLElement>) => {
        touchStartX.current = event.touches[0].clientX;
        touchDeltaX.current = 0;
    };

    const onTouchMove = (event: TouchEvent<HTMLElement>) => {
        if (touchStartX.current === null) {
            return;
        }

        touchDeltaX.current = event.touches[0].clientX - touchStartX.current;
    };

    const onTouchEnd = () => {
        if (touchDeltaX.current <= -threshold) {
            onSwipeLeft();
        } else if (touchDeltaX.current >= threshold) {
            onSwipeRight();
        }

        touchStartX.current = null;
        touchDeltaX.current = 0;
    };

    return {onTouchStart, onTouchMove, onTouchEnd};
};

export {useSwipeCarousel};
