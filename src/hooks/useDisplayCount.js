import {useState, useEffect } from 'react';

const DEFAULT_SETTINGS = {
    initialDisplayCount: 5,
    loadingItemsCount: 2,
};

const getDisplaySettings = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1280) {
        return {
            initialDisplayCount: 12,
            loadingItemsCount: 3,
        };
    }
    
    if (windowWidth >= 684) {
        return {
            initialDisplayCount: 8,
            loadingItemsCount: 2,
        };
    }

    return DEFAULT_SETTINGS;
};

export const useDisplayCount = () => {
    const [displaySettings, setDisplaySettings] = useState(DEFAULT_SETTINGS);

    useEffect(() => {
        setDisplaySettings(getDisplaySettings());
    }, []);

    return displaySettings;
};
