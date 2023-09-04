import React, { useCallback, useMemo } from 'react';

import { BiSearch } from 'react-icons/bi';
import useAsideBar from '@/app/hooks/useAsideBar';
import useRegions from '@/app/hooks/useRegions';
import { useSearchParams } from 'next/navigation';

type Props = {};

const Search = (props: Props) => {
    const aside = useAsideBar();
    const params = useSearchParams();
    const { getByValue } = useRegions();

    const locationValue = params?.get('locationValue');
    const minPrice = params?.get('minPrice');
    const maxPrice = params?.get('maxPrice');
    const guestCount = params?.get('guestCount');

    const priceLabel = useMemo(() => {
        if (minPrice && maxPrice) {
            return `Ksh ${minPrice} - ${maxPrice}`;
        }
        return 'Any Price';
    }, [maxPrice, minPrice]);

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue as string)?.label;
        }
        return 'Anywhere';
    }, [getByValue, locationValue]);

    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`;
        }

        return 'Add Guests';
    }, [guestCount]);

    const toggle = useCallback(() => {
        aside.onOpen();
    }, [aside]);

    return (
        <div
            onClick={toggle}
            className="
			border-[1px] w-full 
			md:w-auto py-2 
			rounded-full 
			shadow-sm 
			hover:shadow-md 
			transition 
			cursor-pointer"
        >
            <div className="flex flex-row items-center justify-center">
                <div className="text-sm font-semibold px-6">{locationLabel}</div>
                <div className="hidden sm:block text-sm font-semibold px-12 border-x-[1px] flex-1 text-center">
                    {priceLabel}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block font-semibold truncate">
                        {guestLabel}
                    </div>
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
