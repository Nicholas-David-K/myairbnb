'use client';

import React, { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { IconType } from 'react-icons';
import qs from 'query-string';
import { twMerge } from 'tailwind-merge';

type Props = {
    icon: IconType;
    label: string;
    selected: boolean;
    isSidebarOpen?: boolean;
};

const SideBarItem = ({ icon: Icon, label, selected, isSidebarOpen }: Props) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label,
        };

        // Delete active state when clicked again
        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl(
            {
                url: '/',
                query: updatedQuery,
            },
            { skipNull: true }
        );

        if (label === 'All') {
            router.push('/');
        } else {
            router.push(url);
        }
    }, [params, router, label]);

    return (
        <div
            onClick={handleClick}
            className={twMerge(
                `flex flex-row items-center w-full h-auto gap-x-4 font-medium cursor-pointer hover:text-primary group hover:bg-neutral-200/60 p-4 transition text-neutral-400 py-2`,
                selected && `text-primary border-r-[2px] border-r-rose-500`
            )}
        >
            <Icon
                size={23}
                className={twMerge(
                    `group-hover:text-rose-500`,
                    selected && `text-rose-500`
                )}
            />
            {isSidebarOpen && (
                <p className="truncate w-full text-neutral-700">{label}</p>
            )}
        </div>
    );
};

export default SideBarItem;
