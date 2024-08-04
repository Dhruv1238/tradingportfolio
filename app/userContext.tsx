"use client";

import React, { createContext, useState, useEffect } from 'react';

interface UserContextValue {
    accessToken: string | null;
    isLoggedIn: boolean;
    loading: boolean;
    setAccessToken: (token: string | null) => void;
    setLoggedIn: (loggedIn: boolean) => void;
    setLoading: (loading: boolean) => void;
}

export const UserContext = createContext<UserContextValue>({
    accessToken: null,
    isLoggedIn: false,
    loading: false,
    setAccessToken: () => { },
    setLoggedIn: () => { },
    setLoading: () => { },
});

// Create the context provider component
export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedAccessToken = localStorage.getItem('accessToken');
            const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            setAccessToken(storedAccessToken);
            setLoggedIn(storedIsLoggedIn);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', accessToken || '');
            localStorage.setItem('isLoggedIn', isLoggedIn.toString());
        }
    }, [accessToken, isLoggedIn]);

    const contextValue: UserContextValue = {
        accessToken,
        isLoggedIn,
        loading,
        setAccessToken,
        setLoggedIn,
        setLoading
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};