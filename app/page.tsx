"use client";
import { Button } from "@nextui-org/react";
import { UserContext } from "./userContext";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { accessToken, isLoggedIn } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    window.open(`https://developer.hdfcsec.com/oapi/v1/login?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, '_blank');
  }

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/stoks');
    }
  }
    , [isLoggedIn]);

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
          <Button
            isLoading
            color="secondary"
            radius="sm"
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
        )}
      </div>
    </>
  );
}
