export const dynamic = 'force-dynamic';

import getListings, { IListingsParams } from './actions/getListings';

import ClientOnly from './components/ClientOnly';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/Listings/ListingCard';
import { SafeListing } from './types';
import getCurrentUser from './actions/getCurrentUser';

interface HomeProps {
    searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
    const currentUser = await getCurrentUser();
    const listings = await getListings(searchParams);

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <Container>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {listings.map((listing: SafeListing) => (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            currentUser={currentUser}
                        />
                    ))}
                </div>
            </Container>
        </ClientOnly>
    );
}
