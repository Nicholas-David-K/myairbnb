import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import TripsClient from './TripsClient';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getReservations from '@/app/actions/getReservations';

type Props = {};

const page = async (props: Props) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login" />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({
        userId: currentUser.id,
    });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips"
                    subtitle="Looks like you haven't reserved any trips"
                />
            </ClientOnly>
        );
    }

    return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default page;
