'use client';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { useCallback, useMemo } from 'react';

import Button from '../Button';
import HeartButton from '../HeartButton';
import Image from 'next/image';
import { Reservation } from '@prisma/client';
import { format } from 'date-fns';
import useRegions from '@/app/hooks/useRegions';
import { useRouter } from 'next/navigation';

type Props = {
    currentUser?: SafeUser | null;
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
};

const ListingCard = ({
    data,
    currentUser,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
}: Props) => {
    const router = useRouter();
    const { getByValue } = useRegions();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (disabled) {
                return;
            }
            onAction?.(actionId);
        },
        [onAction, actionId, disabled]
    );

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        alt="listing"
                        src={data.imageSrc}
                        fill
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton listingId={data.id} currentUser={currentUser} />
                    </div>
                </div>
                <div className="font-semibold text-lg">{location?.label}</div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <div className="font-semibold">Ksh. {price}</div>
                    {!reservation && <div className="font-light">/ night</div>}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    );
};

export default ListingCard;
