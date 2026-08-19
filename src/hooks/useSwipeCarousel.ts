import {MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, useRef} from 'react';

interface IUseSwipeCarouselOptions {
    onSwipeLeft: () => void;
    onSwipeRight: () => void;
    threshold?: number;
}

const useSwipeCarousel = ({onSwipeLeft, onSwipeRight, threshold = 40}: IUseSwipeCarouselOptions) => {
    const startPoint = useRef<{x: number; y: number} | null>(null);
    const isSwipe = useRef(false);

    const onPointerDown = (event: ReactPointerEvent) => {
        if (event.pointerType === 'mouse' && event.button !== 0) {
            return;
        }

        startPoint.current = {x: event.clientX, y: event.clientY};
        isSwipe.current = false;
    };

    const onPointerMove = (event: ReactPointerEvent) => {
        if (!startPoint.current) {
            return;
        }

        const deltaX = event.clientX - startPoint.current.x;
        const deltaY = event.clientY - startPoint.current.y;

        if (!isSwipe.current && Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
            isSwipe.current = true;
        }
    };

    const endSwipe = (event: ReactPointerEvent) => {
        if (!startPoint.current) {
            return;
        }

        const deltaX = event.clientX - startPoint.current.x;

        if (isSwipe.current && Math.abs(deltaX) > threshold) {
            if (deltaX < 0) {
                onSwipeLeft();
            } else {
                onSwipeRight();
            }
        }

        startPoint.current = null;
    };

    const onClickCapture = (event: ReactMouseEvent) => {
        if (isSwipe.current) {
            event.preventDefault();
            event.stopPropagation();
            isSwipe.current = false;
        }
    };

    return {
        onClickCapture,
        onPointerCancel: endSwipe,
        onPointerDown,
        onPointerMove,
        onPointerUp: endSwipe,
    };
};

export {useSwipeCarousel};
