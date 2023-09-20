'use client'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Skeleton from "react-skeleton";
import { UseAuthContext } from '@/Context/AuthContext';
import { useStateContext } from '@/Context/context';
import { ImageSkeleton, Navbar } from '../components';
import images from '../../../images';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableImages } from '../components/SortableImages';

function Home() {
    const { error, setError, loading, setLoading, search, setSearch } = useStateContext()
    const { signup, currentUser } = UseAuthContext();
    const [newImages, setNewImages] = useState();
    const [dragStart, setDragStart] = useState(false);

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

        setDragStart(false)

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

    // const onDragStart = (e, index) => {
    //     e.dataTransfer.setData('index', index);
    //     setDragStart(true)
    //     dragItem.current = index
    // }

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
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleSort}
            >
                <div className='grid grid-cols-4 gap-4 w-full h-full my-6 '>
                    {
                        newImages ?
                            <SortableContext
                                items={newImages}
                            >
                                {newImages.map((item, index) => <SortableImages key={index} id={item} />)}
                            </SortableContext>
                            :
                            <ImageSkeleton cards={images.length} />
                    }
                </div>
            </DndContext>
        </div>
    )
}

export default Home;