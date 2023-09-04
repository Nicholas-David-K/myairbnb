'use client';

import Avatar from '../Avatar';
import { IconType } from 'react-icons';
import ListingCategory from './ListingCategory';
import React from 'react';
import { SafeUser } from '@/app/types';
import dynamic from 'next/dynamic';
import useRegions from '@/app/hooks/useRegions';

const Map = dynamic(() => import('../Map'), {
    ssr: false,
});

type Props = {
    user?: SafeUser | null;
    category:
        | {
              icon: IconType;
              label: string;
              description: string;
          }
        | undefined;
    guestCount: number;
    description: string;
    roomCount: number;
    bathroomCount: number;
    locationValue: string;
};

const ListingInfo = ({
    user,
    category,
    guestCount,
    description,
    roomCount,
    bathroomCount,
    locationValue,
}: Props) => {
    const { getByValue } = useRegions();
    const coordinates = getByValue(locationValue)?.latlng;
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} guests</div>
                    <div>{roomCount} rooms</div>
                    <div>{bathroomCount} bathrooms</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">{description}</div>
            <hr />
            <Map center={coordinates} />
        </div>
    );
};

export default ListingInfo;
