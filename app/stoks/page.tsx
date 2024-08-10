"use client";

import React, { useContext, useEffect } from 'react';
import { UserContext } from '../userContext';
import { useRouter } from 'next/navigation';
import LogoutButton from '../components/LogoutButton';


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
            <h1 className="text-3xl text-purple-900 font-bold max-w-10">Stoks:{accessToken}</h1>
            <LogoutButton />
        </div>
    );
}

export default StoksPage;