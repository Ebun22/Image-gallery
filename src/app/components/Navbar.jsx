'use client'
import { UseAuthContext } from '@/Context/AuthContext';
import Image from 'next/image';
import React from 'react';
import { UserDetails } from '.';

const Navbar = () => {
    const { isLogin } = UseAuthContext();
    return (
        <div className="flex flex-row p-2 pl-4 justify-between">
            <div className='flex flex-row'>   
                <Image
                    src='/images/logo.png'
                    alt="logo"
                    width={30}
                    height={30}
                    className="mr-2 rounded-full"
                />
                <p className="text-2xl font-bold">CamGallary</p>
            </div>
           
                {isLogin && <UserDetails />}
         
        </div>
    )
}

export default Navbar