import {useEffect, useState} from 'react';

const getMotionPreference = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const usePrefersReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(getMotionPreference);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

        handleChange();
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
};

export {usePrefersReducedMotion};
