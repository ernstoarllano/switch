'use client'

import { useEffect, useState } from "react";

const STORAGE_KEY = "favorites";

export function useFavorite() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setFavorites(Array.isArray(parsed) ? parsed : []);
            } catch {
                setFavorites([]);
            }
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        }
    }, [favorites, isInitialized]);

    const isFavorite = (deviceId: string) => {
        return favorites.includes(deviceId);
    };

    const addFavorite = (deviceId: string) => {
        setFavorites((prev) => {
            if (prev.includes(deviceId)) return prev;
            return [...prev, deviceId];
        });
    };

    const removeFavorite = (deviceId: string) => {
        setFavorites((prev) => prev.filter((id) => id !== deviceId));
    };

    const toggleFavorite = (deviceId: string) => {
        if (isFavorite(deviceId)) {
            removeFavorite(deviceId);
        } else {
            addFavorite(deviceId);
        }
    };

    return {
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
    };
}
