import Image from 'next/image'
import React from 'react'

const Navbar = () => {
    return (
        <div className="p-4 pl-8">
            <div className='flex flex-row'>
            <Image
            src='/images/logo.png'
            alt="logo"
            width={30}
            height={30}
            className="mr-2"
            />
            <p className="text-2xl font-bold">CamGallary</p>
            </div>
           
        </div>
    )
}

export default Navbar