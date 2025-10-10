import React, {useEffect} from 'react'
import {useLocation, useNavigate} from "react-router";

import SpinnerLoading from "../components/SpinnerLoading";

import {usePuterStore} from "~/lib/puter";

export const meta = () => ([
    { title: 'Auth - GP Resume' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { isLoading, auth } = usePuterStore()

    const next = location.search.split('next=')[1]

    const isAuthenticated = auth.isAuthenticated;

    const handleClick = () => {
        if (isLoading) return;
        isAuthenticated ? auth.signOut() : auth.signIn();
    };

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next)
    }, [auth.isAuthenticated, next]);

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h3 className="md:text-lg">Log In to continue your journey</h3>
                    </div>

                    <div>
                        <button
                            className={`auth-button ${isLoading ? 'animate-pulse cursor-not-allowed' : ''} flex justify-center items-center`}
                            onClick={handleClick}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <SpinnerLoading />
                            ) : (
                                <p>{isAuthenticated ? "Log Out" : "Log In"}</p>
                            )}
                        </button>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth