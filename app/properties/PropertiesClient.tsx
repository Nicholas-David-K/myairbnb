'use client';

import { useRouter } from 'next/navigation';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/Listings/ListingCard';
import { SafeUser, SafeReservation, SafeListing } from '../types';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

type Props = {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
};

const PropertiesClient = ({ listings, currentUser }: Props) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onDelete = useCallback(
        (id: string) => {
            setDeletingId(id);

            axios
                .delete(`/api/listings/${id}`)
                .then(() => {
                    toast.success('Property deleted');
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.error);
                })
                .finally(() => {
                    setDeletingId('');
                });
        },
        [router]
    );
    return (
        <Container>
            <Heading
                title="Properties"
                subtitle="Where you've been and where you're going!"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        actionLabel="Delete listing"
                        disabled={deletingId === listing.id}
                        currentUser={currentUser}
                        onAction={onDelete}
                    />
                ))}
            </div>
        </Container>
    );
};

export default PropertiesClient;
