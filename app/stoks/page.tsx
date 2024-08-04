"use client";

import React, { useContext, useEffect } from 'react';
import { UserContext } from '../userContext';
import { useRouter } from 'next/navigation';


const StoksPage = () => {

    const { accessToken, isLoggedIn } = useContext(UserContext);

    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn]);

    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-3xl text-purple-900 font-bold">Stoks:{accessToken}</h1>
        </div>
    );
}

export default StoksPage;