'use client';

import { SafeReservation, SafeUser } from '@/app/types';
import { useCallback, useState } from 'react';

import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import ListingCard from '@/app/components/Listings/ListingCard';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Props = {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
};

const ReservationsClient = ({ reservations, currentUser }: Props) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id);

            axios
                .delete(`api/reservations/${id}`)
                .then(() => {
                    toast.success('Reservation cancelled');
                    router.refresh();
                })
                .catch((error) => {
                    toast.error('Something went wrong!');
                })
                .finally(() => {
                    setDeletingId('');
                });
        },
        [router]
    );

    return (
        <Container>
            <Heading title="Reservations" subtitle="Bookings on your properties" />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        actionLabel="Cancel guest reservation"
                        disabled={deletingId === reservation.id}
                        currentUser={currentUser}
                        onAction={onCancel}
                    />
                ))}
            </div>
        </Container>
    );
};

export default ReservationsClient;
