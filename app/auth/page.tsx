"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { UserContext } from '../userContext';

const RedirectAuth = () => {
    const [requestToken, setRequestToken] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const { setAccessToken: setContextAccessToken, setLoggedIn } = useContext(UserContext);

    const router = useRouter();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('requestToken');
        setRequestToken(token);
    }, []);

    const fetchAccessToken = async () => {
        try {
            const response = await axios.post(`https://developer.hdfcsec.com/oapi/v1/access-token`,
                {
                    "apiSecret": process.env.NEXT_PUBLIC_API_SECRET
                },
                {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_API_KEY,
                        request_token: requestToken
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

            setAccessToken(response.data.accessToken);
            console.log('Access Token:', response.data.accessToken);
        } catch (error) {
            console.error('Error fetching access token:', error);
        }
    };

    useEffect(() => {
        if (requestToken) {
            console.log('Request Token:', requestToken);
            fetchAccessToken();
        }
    }, [requestToken]);

    useEffect(() => {
        if (accessToken) {
            setContextAccessToken(accessToken);
            setLoggedIn(true);
            router.push('/');
        }
    }
    , [accessToken]);

    return (
        <div className='flex justify-center items-center h-screen'>
            <h1 className='text-3xl text-purple-900 font-bold'>Logging you in!</h1>
        </div>
    );
}

export default RedirectAuth;