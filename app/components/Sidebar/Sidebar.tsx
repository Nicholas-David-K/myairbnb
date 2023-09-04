'use client';

import { BiSolidTree, BiSolidWine } from 'react-icons/bi';
import {
    GiBarn,
    GiBigWave,
    GiBoatFishing,
    GiCactus,
    GiCampingTent,
    GiCaveEntrance,
    GiFamilyHouse,
    GiForestCamp,
    GiIsland,
    GiWindmill,
} from 'react-icons/gi';
import { IoDiamond, IoHome } from 'react-icons/io5';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';

import Box from '../Box';
import { BsSnow } from 'react-icons/bs';
import { FaSkiing } from 'react-icons/fa';
import { MdOutlineVilla } from 'react-icons/md';
import SideBarItem from './SidebarItem';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

type SidBarProps = {
    children: React.ReactNode;
};

export const categories = [
    {
        label: 'All',
        icon: IoHome,
        description: 'All properties',
    },
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach',
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmills',
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description: 'This property is bt the countryside',
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern',
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This property has a pool',
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island',
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is close to a lake',
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property is modern',
    },
    {
        label: 'Castle',
        icon: GiCampingTent,
        description: 'This property has skiing activities',
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property has camping activities',
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property has snow activities',
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property is in a cave',
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is the desert',
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is a barn',
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is a luxurious',
    },
    {
        label: 'Vineyard',
        icon: BiSolidWine,
        description: 'This property is be the vineyard',
    },
    {
        label: 'Treehouses',
        icon: BiSolidTree,
        description: 'This property is a treehouse',
    },
    {
        label: 'Mansions',
        icon: GiFamilyHouse,
        description: 'This property is a mansion',
    },
    {
        label: 'Beachfront',
        icon: GiBigWave,
        description: 'This property is by the beach',
    },
];

const SideBar = ({ children }: SidBarProps) => {
    const params = useSearchParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const category = params?.get('category');

    return (
        <div className="flex h-full border-r">
            <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className={`sidebar hidden md:flex flex-col py-2 gap-y-2 h-full duration-500 border-r ${
                    isOpen ? 'w-[200px]' : 'w-[65px]'
                }`}
            >
                <Box className="overflow-hidden no-scroll hover:overflow-y-auto">
                    <div className="flex flex-col gap-y-4 pt-24">
                        {categories.map((item) => (
                            <SideBarItem
                                key={item.label}
                                {...item}
                                selected={
                                    category === item.label ||
                                    (!category && item.label === 'All')
                                }
                                isSidebarOpen={isOpen}
                            />
                        ))}
                    </div>
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto pt-28 pb-20">
                {children}
            </main>
        </div>
    );
};

export default SideBar;
