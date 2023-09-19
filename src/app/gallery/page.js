'use client'
import Image from 'next/image'
import React from 'react';
import { UseAuthContext } from '@/Context/AuthContext';
import { useStateContext } from '@/Context/context';
import { Navbar } from '../components';
import  images from '../../images.json';

function Home() {
    const { error, setError, loading, setLoading } = useStateContext()
    const { signup, currentUser } = UseAuthContext();

    return (
        <div className="p-4 pl-8">
            <Navbar />
            <div>
{console.log(images)}
            </div>
        </div>
    )
}

export default Home;