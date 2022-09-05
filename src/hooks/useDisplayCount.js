import {useState, useEffect } from 'react';
import { debounce } from "../utils/debounce";


const getDisplayCount = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) {
        return 12;
    }
    if (windowWidth >= 684) {
        return 8;
    }
    if (windowWidth >= 684) {
        return 5;
    }

    return 5;
};

const getLoadingCount = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) {
        return 3;
    }
    if (windowWidth >= 684) {
        return 2;
    }
    if (windowWidth >= 684) {
        return 2;
    }

    return 2;
};

export const useDisplayCount = () => {
    const [displayCount, setDisplayCount] = useState(getDisplayCount);
    const [loadingCount, setLoadingCount] = useState(getLoadingCount);

    useEffect(() => {
        const changeResolution = debounce(() => {
            setLoadingCount(getLoadingCount());
        }, 500);
        window.addEventListener("resize", changeResolution);
        return () => {
            document.removeEventListener('resize', changeResolution);
        };
    }, []);

    return [displayCount, loadingCount];
};
