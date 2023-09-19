'use client'
import Image from 'next/image'
import React from 'react';
import { UseAuthContext } from '@/Context/AuthContext';
import { useStateContext } from '@/Context/context';
import { Navbar } from '../components';
import images from '../../../images';

function Home() {
    const { error, setError, loading, setLoading } = useStateContext()
    const { signup, currentUser } = UseAuthContext();

    return (
        <div className="p-4 pl-8">
            <Navbar />
            <div>
                <div>
                <h1 className="text-4xl font-bold">Photos</h1>
                <span className="text-sky-400">Recent</span>
                </div>
                
                <div>
                    <input type='text' placeholder='Search' className='bg-tarnspartent p-2 border-2 border-slate-300 rounded-lg' />
                    <span>
                        
                    </span>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-4 w-full h-full my-14 '>
                {images.map((item, index) => (
                    <div key={index} className='h-64 w-full'>
                        <Image 
                        width={250}
                        height={250}
                        alt={item.name}
                        src={item.path}
                        className='w-full h-full '
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;