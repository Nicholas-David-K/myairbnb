import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    isEntirePlace?: string;
    isPrivateRoom?: string;
    isSharedRoom?: string;
}

export default async function getListings(params: IListingsParams) {
    try {
        const {
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            minPrice,
            maxPrice,
            category,
            isEntirePlace,
            isPrivateRoom,
            isSharedRoom,
        } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount,
            };
        }

        if (minPrice !== undefined) {
            query.price = {
                gte: +minPrice,
            };
        }

        if (maxPrice !== undefined) {
            query.price = {
                lte: +maxPrice,
            };
        }

        if (isEntirePlace === 'true') {
            query.roomType = 'ENTIRE_PLACE';
        }

        if (isSharedRoom === 'true') {
            query.roomType = 'SHARED_ROOM';
        }

        if (isPrivateRoom === 'true') {
            query.roomType = 'PRIVATE_ROOM';
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount,
            };
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount,
            };
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (category) {
            query.category = category;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate },
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate },
                            },
                        ],
                    },
                },
            };
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}
