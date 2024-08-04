import React from 'react';
import { UserContextProvider } from './userContext';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <UserContextProvider>
            {children}
        </UserContextProvider>
    );
};

export default Providers;