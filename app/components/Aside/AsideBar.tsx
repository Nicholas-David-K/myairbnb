'use client';

import CountySelect, { RegionSelectValue } from '../Inputs/RegionSelect';
import { FieldValues, useForm } from 'react-hook-form';
import { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Aside from './Aside';
import CheckBox from '../Inputs/CheckBox';
import Counter from '../Inputs/Counter';
import Input from '../Inputs/Input';
import dynamic from 'next/dynamic';
import qs from 'query-string';
import useAsideBar from '@/app/hooks/useAsideBar';

type Props = {};

const AsideBar = (props: Props) => {
    const router = useRouter();
    const params = useSearchParams();

    const aside = useAsideBar();

    const [isLoading, setIsLoading] = useState(false);

    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);

    const [isSharedRoom, setIsSharedRoom] = useState(false);
    const [isEntirePlace, setIsEntirePlace] = useState(false);
    const [isPrivateRoom, setIsPrivateRoom] = useState(false);

    const [location, setLocation] = useState<RegionSelectValue>();

    const Map = useMemo(
        () =>
            dynamic(() => import('../Map'), {
                ssr: false,
            }),
        // eslint-disable-next-line
        [location]
    );

    const {
        register,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            minPrice: null,
            maxPrice: null,
        },
    });

    const onSubmit = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const { minPrice, maxPrice } = watch();

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
            isSharedRoom,
            isPrivateRoom,
            isEntirePlace,
            minPrice,
            maxPrice,
        };

        const url = qs.stringifyUrl(
            {
                url: '/',
                query: updatedQuery,
            },
            { skipNull: true }
        );

        router.push(url);
        setTimeout(() => {
            aside.onClose();
        }, 300);
    }, [
        params,
        isEntirePlace,
        isPrivateRoom,
        isSharedRoom,
        router,
        watch,
        aside,
        guestCount,
        roomCount,
        bathroomCount,
        location,
    ]);

    const secondaryAction = useCallback(() => {
        router.push('/');
        setTimeout(() => {
            aside.onClose();
        }, 300);
    }, [aside, router]);

    const bodyContent = (
        <div className="flex flex-col gap-y-2">
            <div className="text-lg font-semibold">Price Range</div>
            <div className="text-neutral-400">
                The average nightly price is Ksh. 6,500
            </div>

            <div className="flex flex-row items-center gap-x-2 justify-between">
                <Input
                    id="minPrice"
                    label="Min price"
                    formatPrice
                    type="number"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    placeholder="0"
                />
                <Input
                    id="maxPrice"
                    label="Max price"
                    formatPrice
                    type="number"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    placeholder="3500"
                />
            </div>
            <hr className="my-5" />
            <div className="flex flex-col gap-y-4">
                <div className="text-lg font-semibold">Type of place</div>
                <CheckBox
                    id="isEntirePlace"
                    label="Entire Place"
                    description="A place all to yourself."
                    value={isEntirePlace}
                    onChange={() => setIsEntirePlace(!isEntirePlace)}
                />
                <CheckBox
                    id="isPrivateRoom"
                    label="Private Room"
                    description="Your own room in a home or a hotel, plus some shared common spaces."
                    value={isPrivateRoom}
                    onChange={() => setIsPrivateRoom(!isPrivateRoom)}
                />
                <CheckBox
                    id="isSharedRoom"
                    label="Shared Room"
                    description="A sleeping space and common areas that may be shared with others."
                    value={isSharedRoom}
                    onChange={() => setIsSharedRoom(!isSharedRoom)}
                />
                <hr className="my-5" />
                <div className="text-lg font-semibold">
                    Bedrooms, bathrooms, guests
                </div>
                <Counter
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you need??"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need??"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
            <hr className="my-5" />
            <div className="flex flex-col gap-8">
                <div className="text-lg font-semibold">Where do you want do go?</div>
                <CountySelect
                    value={location}
                    onChange={(value: any) =>
                        setLocation(value as RegionSelectValue)
                    }
                />
                <hr />
                {/* @ts-ignore */}
                <Map center={location?.latlng} />
            </div>
        </div>
    );

    return (
        <Aside
            disabled={isLoading}
            isOpen={aside.isOpen}
            title="Filters"
            actionLabel="Submit"
            onClose={aside.onClose}
            secondaryActionLabel="Clear All"
            secondaryAction={secondaryAction}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
};

export default AsideBar;
