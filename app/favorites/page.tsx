import React from 'react';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getFavoriteListings from '../actions/getFavoriteListings';
import getCurrentUser from '../actions/getCurrentUser';
import FavoritesClient from './FavoritesClient';

type Props = {};

const FavoriteListingPage = async (props: Props) => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you haven't liked any listings"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavoritesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default FavoriteListingPage;
