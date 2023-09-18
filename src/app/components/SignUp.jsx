'use client'
import React from 'react';

const SignUp = () => {
    return (
        <>
            <div className='flex flex-col items-center mt-18'>
                <form className='p-4 w-1/4'>
                    <h1 className='py-8 text-4xl font-bold'>SignUp</h1>

                    <div className='mb-4 flex flex-col w-full'>
                        <label className="font-bold">Name:</label>
                        <input type='text' className='p-1 border-2 border-black rounded-sm' />
                    </div>
                    <div className='mb-4 flex flex-col w-full'>
                        <label className="font-bold">Email:</label>
                        <input type='text' className='p-1 border-2 border-black rounded-sm' />
                    </div>
                    <div className='mb-4 flex flex-col w-full'>
                        <label className="font-bold">Password:</label>
                        <input type='password' className='p-1 border-2 border-black rounded-sm' />
                    </div>
                    <div className='mb-4 flex flex-col w-full'>
                        <label className="font-bold">Confirm Password:</label>
                        <input type='password' className='p-1 border-2 border-black rounded-sm' />
                    </div>

                    <button className='w-full p-3 text-white font-bold mx-auto  bg-sky-600 rounded-lg'>Login</button>
                </form>
            </div>
        </>
    )
}

export default SignUp;