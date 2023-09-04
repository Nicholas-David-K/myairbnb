import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import PropertiesClient from './PropertiesClient';
import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';

type Props = {};

export const dynamic = 'force-dynamic';

const PropertiesPage = async (props: Props) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login" />
            </ClientOnly>
        );
    }

    const properties = await getListings({
        userId: currentUser.id,
    });

    if (properties.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="You have no properties"
                    subtitle="Looks like you haven't added any properties"
                />
            </ClientOnly>
        );
    }

    return <PropertiesClient listings={properties} currentUser={currentUser} />;
};

export default PropertiesPage;
