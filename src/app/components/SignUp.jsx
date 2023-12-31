'use client'
import { UseAuthContext } from '@/Context/AuthContext';
import { useStateContext } from '@/Context/context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useEffect, useState } from 'react';

const SignUp = () => {
    const userRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const pwdConfirmRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const { hasAccount, setHasAccount} = useStateContext()
    const { signup, currentUser } = UseAuthContext();
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== pwdConfirmRef.current.value) {
            return setError('passwords do not match')
        }

        try {
            //set error to empty when creating a new account
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value);
            setHasAccount(true)
        } catch {
            setError('Failed to create an account')
        }
        //after waiting for signup
        setLoading(true)
    }

    useEffect(() => {
        errRef.current.focus();
    }, [error])

    return (
        <>
            <div className='flex flex-col items-center mt-18'>
                {currentUser && currentUser.email}
                {currentUser && currentUser.password}
                <form className='w-1/4' onSubmit={handleSubmit}>

                    <h1 className='py-8 pt-2 px-4 text-4xl font-bold'>SignUp</h1>
                    <p ref={errRef} className={`${error ? " " : "hidden"} bg-red-100 py-2 px-1 border-l-4 text-red-800 text-center border-red-600`}>{error}</p>

                    <div className='mb-4 px-4 flex flex-col w-full'>
                        <label className="font-bold">Name:</label>
                        <input ref={userRef} type='text' className='p-1 border-2 border-black rounded-sm' />
                    </div>
                    <div className='mb-4 px-4 flex flex-col w-full'>
                        <label className="font-bold">Email:</label>
                        <input ref={emailRef} type='text' className='p-1 border-2 border-black rounded-sm' />
                    </div>
                    <div className='mb-4 px-4 flex flex-col w-full'>
                        <label className="font-bold">Password:</label>
                        <input ref={passwordRef} type='password' className='p-1 border-2 border-black rounded-sm' />
                    </div>
                    <div className='mb-4 px-4 flex flex-col w-full'>
                        <label className="font-bold">Confirm Password:</label>
                        <input ref={pwdConfirmRef} type='password' className='p-1 border-2 border-black rounded-sm' />
                    </div>

                   
                        <button
                            disabled={loading}
                            className='w-full p-3 text-white font-bold mx-auto bg-sky-600 rounded-lg'
                        >
                            SignUp
                        </button>
                
                </form>
            </div>
        </>
    )
}

export default SignUp;