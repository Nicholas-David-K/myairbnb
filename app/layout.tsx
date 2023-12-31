import './globals.css';

import AsideBar from './components/Aside/AsideBar';
import ClientOnly from './components/ClientOnly';
import LoginModal from './components/Modals/LoginModal';
import type { Metadata } from 'next';
import Navbar from './components/Navbar/Navbar';
import RegisterModal from './components/Modals/RegisterModal';
import RentModal from './components/Modals/RentModal';
import SideBar from './components/Sidebar/Sidebar';
import { Sora } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';

const inter = Sora({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Airbnb',
    description: 'Generated by create next app',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={inter.className}>
                <ClientOnly>
                    <ToasterProvider />
                    <RentModal />
                    <RegisterModal />
                    <LoginModal />
                    <Navbar currentUser={currentUser} />
                    <AsideBar />
                    <SideBar>{children}</SideBar>
                </ClientOnly>
            </body>
        </html>
    );
}
