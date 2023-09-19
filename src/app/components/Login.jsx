'use client'
import React, { useRef, useState, useEffect } from 'react';
import { useStateContext } from '@/Context/context';
import { UseAuthContext } from '@/Context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const router = useRouter()

    // const { error, setError, loading, setLoading } = useStateContext()
    const { login, currentUser } = UseAuthContext();
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //set error to empty when creating a new account
            setError('')
            setLoading(true)
            await login(userRef.current.value, passwordRef.current.value);
            router.push('/gallery');
        } catch {
            setError("Account doesn't exist")
        }
        //after waiting for login
        setLoading(true)
    }

    useEffect(() => {
        errRef.current.focus();
    }, [error])

    return (
        <>
            <div className='flex flex-col items-center mt-18'>
                <form className='p-4 w-1/4' onSubmit={(e) => handleSubmit(e)}>
                    <h1 className='py-8 text-4xl font-bold'>Login</h1>
                    {currentUser.email}
                    <p ref={errRef} className={`${error ? " " : "hidden"} bg-red-100 py-2 px-1 border-l-4 text-red-800 text-center border-red-600`}>{error}</p>
                    <div className='mb-4 flex flex-col w-full'>
                        <label className="font-bold">UserName:</label>
                        <input ref={userRef} type='text' className='p-1 border-2 border-black rounded-sm' />
                    </div>
                    <div className='mb-4 flex flex-col w-full'>
                        <label className="font-bold">Password:</label>
                        <input ref={passwordRef} type='password' className='p-1 border-2 border-black rounded-sm' />
                    </div>

                    <button disabled={loading} type='button' onClick={(e) => handleSubmit(e)} className='w-full p-3 text-white font-bold mx-auto  bg-sky-600 rounded-lg'>Login</button>
                </form>
            </div>
        </>
    )
}

export default Login