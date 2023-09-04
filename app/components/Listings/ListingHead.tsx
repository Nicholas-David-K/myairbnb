import Heading from '../Heading';
import HeartButton from '../HeartButton';
import Image from 'next/image';
import React from 'react';
import { SafeUser } from '@/app/types';
import useRegions from '@/app/hooks/useRegions';

type Props = {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser?: SafeUser | null;
};

const ListingHead = ({ title, imageSrc, locationValue, id, currentUser }: Props) => {
    const { getByValue } = useRegions();

    const location = getByValue(locationValue);

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.value}, ${location?.label}`}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    alt="image"
                    src={imageSrc}
                    fill
                    className="object-hover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    );
};

export default ListingHead;
