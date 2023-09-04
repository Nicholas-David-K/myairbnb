'use client';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';

import ListingHead from '@/app/components/Listings/ListingHead';
import ListingInfo from '@/app/components/Listings/ListingInfo';
import ListingReservation from '@/app/components/Listings/ListingReservation';
import { Range } from 'react-date-range';
import axios from 'axios';
import { categories } from '@/app/components/Sidebar/Sidebar';
import { toast } from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
};

type Props = {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
};

const ListingClient = ({ listing, currentUser, reservations = [] }: Props) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    // CREATE A RESERVATION
    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        setIsLoading(true);
        axios
            .post('/api/reservations', {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing?.id,
            })
            .then(() => {
                toast.success('Listing reserved');
                setDateRange(initialDateRange);

                // redirect to  /trips
                router.push('/trips');
            })
            .catch((error) => {
                toast.error('Something went wrong. Try again!');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [totalPrice, dateRange, listing?.id, currentUser, loginModal, router]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dateCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dateCount && listing.price) {
                setTotalPrice(dateCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);
    return (
        <div className="md:max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo
                        user={listing.user}
                        category={category}
                        guestCount={listing.guestCount}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                    />
                    <div className="order-first mb-10 md:order-last md:col-span-3">
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            dateRange={dateRange}
                            onChangeDate={(value) => setDateRange(value)}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingClient;
