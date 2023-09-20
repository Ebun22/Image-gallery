import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';

export function SortableImages(props) {
        const { id, key } = props
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: id.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div
                key={key}
                ref={setNodeRef} style={style} {...attributes} {...listeners}
                className=" relative h-64 w-full group"
            >
                <Image
                    width={250}
                    height={250}
                    alt={id.name}
                    src={id.path}
                    className='w-full h-full'
                />
                <p className="absolute bottom-0 bg-black w-full p-1 text-white text-sm text-center">
                    {id.description}
                </p>
            </div>
        </div>
    )
}