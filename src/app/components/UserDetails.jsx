'use client'
import Image from 'next/image'
import React from 'react';
import { UseAuthContext } from '@/Context/AuthContext';
import { useStateContext } from '@/Context/context';

const UserDetails = () => {
    const { error, setError, loading, setLoading } = useStateContext()
    const { signup, currentUser } = UseAuthContext();

    return (
        <div className='flex flex-row justify-end w-1/2 h-full '>
            <div className='rounded-full h-full '>
                <Image
                    src='/images/profile.png'
                    alt="logo"
                    width={30}
                    height={30}
                    className="mr-2 rounded-full"
                />
            </div>

            <p className="flex flex-col">
                {currentUser && currentUser.email}
                <span className="text-red-500 text-sm text-right">Logout</span>
            </p>

        </div>
    )
}

export default UserDetails;