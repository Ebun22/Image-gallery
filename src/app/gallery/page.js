'use client'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'
import { UseAuthContext } from '@/Context/AuthContext';
import { useStateContext } from '@/Context/context';
import { Navbar } from '../components';
import images from '../../../images';

function Home() {
    const { error, setError, loading, setLoading } = useStateContext()
    const { signup, currentUser } = UseAuthContext();
    const [newImages, setNewImages] = useState();

    const dragItem = useRef();
    const dragOverItem = useRef();
    console.log("this is the item being dragged", dragItem)
    console.log("this is the item being dragged over", dragOverItem)

    //handle rearrangment of images
    const handleSort = () => {
        //create a duplicate list
        const newImageArray = [...images]
        // setNewImages(images)
        console.log(newImages)

        //remove and save the dragged content
        //i.e at position dragItem, remove 1 element which would be the dragged item
        console.log(newImageArray.splice(dragItem.current, 1)[0])
    }
    useEffect(() => {
        handleSort()
    }, [])

    
    const handleDragEnd = () => {
        console.log("This is DragEnd")
    }

    return (
        <div className="p-4 pl-8">
            <Navbar />
            <div className='flex flex-row w-full justify-between my-10'>
                <div>
                    <h1 className="text-4xl font-bold">Photos</h1>
                    <span className="text-sky-400">Recent</span>
                </div>

                <div >
                    <input type='text' placeholder='Search' className='bg-tarnspartent p-2 border-2 border-slate-300 rounded-lg mt-4' />
                    <p className='absolute z-10 mt-2 top-32 bottom-0 right-6 w-4 h-4 flex justify-end'>
                        <AiOutlineSearch />
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-4 w-full h-full my-6 '>
                {images.map((item, index) => (
                    <div
                        key={index}
                        className='h-64 w-full'
                        draggable
                        onDragStart={(e) => dragItem.current = index}
                        onDragEnter={(e) => dragOverItem.current = index}
                        onDragEnd={handleDragEnd}

                    >
                        <Image
                            width={250}
                            height={250}
                            alt={item.name}
                            src={item.path}
                            className='w-full h-full'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;