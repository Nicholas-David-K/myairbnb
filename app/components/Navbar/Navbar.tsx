'use client';

import Container from '../Container';
import Logo from './Logo';
import { SafeUser } from '@/app/types';
import Search from './Search';
import UserMenu from './UserMenu';

type Props = {
    currentUser?: SafeUser | null;
};

const Navbar = ({ currentUser }: Props) => {
    return (
        <div className="w-full bg-white fixed z-30">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <div className="absolute left-[50%] translate-x-[-50%]">
                            <Search />
                        </div>
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Navbar;
