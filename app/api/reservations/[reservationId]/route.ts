import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
    reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    const reservations = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                // Allows owners of reversations and owner of property to cancel reservations
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } },
            ],
        },
    });

    return NextResponse.json(reservations);
}
