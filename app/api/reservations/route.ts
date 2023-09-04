import getCurrentUser from '@/app/actions/getCurrentUser';
import useLoginModal from '@/app/hooks/useLoginModal';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { totalPrice, startDate, endDate, listingId } = body;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                },
            },
        },
    });

    return NextResponse.json(listingAndReservation);
}
