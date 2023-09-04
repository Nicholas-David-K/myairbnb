import { NextResponse } from 'next/server';
import { RoomType } from '@prisma/client';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
        roomType,
    } = body;

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            roomType,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id,
        },
    });

    return NextResponse.json(listing);
}
