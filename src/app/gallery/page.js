'use client'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'
import { UseAuthContext } from '@/Context/AuthContext';
import { useStateContext } from '@/Context/context';
import { Navbar } from '../components';
import images from '../../../images';

function Home() {
    const { error, setError, loading, setLoading, search, setSearch } = useStateContext()
    const { signup, currentUser } = UseAuthContext();
    const [newImages, setNewImages] = useState();

    const dragItem = useRef();
    const dragOverItem = useRef();

    useEffect(() => {
        setNewImages(images)
    }, [])

    //function to convert capitalize any word
    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    //handle rearrangment of images
    const handleSort = () => {
        //create a duplicate list
        const newImageArray = [...images]
        // setNewImages(images)
        console.log(newImages)

        //remove and save the dragged content
        //i.e at position dragItem, remove 1 element which would be the dragged item
        const draggedItem = newImageArray.splice(dragItem.current, 1)[0]

        //modifies the duplicate list generated and adds dragged item to new position
        newImageArray.splice(dragOverItem.current, 0, draggedItem);

        // resets the refs
        dragItem.current = null;
        dragOverItem.current = null;

        setNewImages(newImageArray)
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value.trim())

        if (value.trim() === "") {
            setNewImages(images);
        } else {
            const searchedData = newImages.filter(item => (item.description.includes(capitalize(search) || search)))

            setNewImages(searchedData);
        }

        console.log(newImages)
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
                    <input
                        type='text'
                        placeholder='Search'
                        className='bg-tarnspartent p-2 border-2 border-slate-300 rounded-lg mt-4'
                        onChange={(e) => handleSearch(e)}
                    />
                    <p className='absolute z-10 mt-2 top-32 bottom-0 right-6 w-4 h-4 flex justify-end'>
                        <AiOutlineSearch />
                    </p>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-4 w-full h-full my-6 '>
                {newImages?.map((item, index) => (
                    <div
                        key={index}
                        className='relative h-64 w-full group'
                        draggable
                        onDragStart={() => dragItem.current = index}
                        onDragEnter={() => dragOverItem.current = index}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnd={handleSort}

                    >
                        <Image
                            width={250}
                            height={250}
                            alt={item.name}
                            src={item.path}
                            className='w-full h-full'
                        />
                        <p className="absolute bottom-0 bg-black w-full p-1 text-white text-sm text-center">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;