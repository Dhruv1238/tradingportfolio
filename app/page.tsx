"use client";
import { Button, Kbd } from "@nextui-org/react";
import { UserContext } from "./userContext";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function Home() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    window.open(`https://developer.hdfcsec.com/oapi/v1/login?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, '_blank');
  }

  const [requestToken, setRequestToken] = useState<string | null>(null);

  const { setAccessToken: setContextAccessToken, accessToken, setLoggedIn } = useContext(UserContext);

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

      setContextAccessToken(response.data.accessToken);
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
      router.push('/stoks');
    }
  }
    , [accessToken]);

  return (
    <>
      <h1 className=" text-3xl m-5 font-bold fixed">My Stoks</h1>
      <div className="flex justify-center items-center h-screen">
        {!loading ? (
          <>
            <Button
              color="secondary"
              radius="sm"
              onClick={handleLogin}
            >
              Login
            </Button>
          </>
        ) : (
          <div className="flex items-center">
            <Kbd className="hidden md:flex" keys={["command"]}>+W</Kbd>
            <Button
              isLoading
              color="secondary"
              radius="sm"
              className="m-5"
              spinner={
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
              }
            >
              Complete login on other window
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
