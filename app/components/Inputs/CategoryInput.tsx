'use client';

import { IconType } from 'react-icons';

type Props = {
    selected?: boolean;
    icon: IconType;
    label: string;
    onClick: (value: string) => void;
};

const CategoryInput = ({ onClick, selected, icon: Icon, label }: Props) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
                selected ? 'border-black' : 'border-neutral-200'
            }`}
        >
            <div className="flex flex-row items-center gap-x-10">
                <Icon size={30} />
                <div className="font-semibold">{label}</div>
            </div>
        </div>
    );
};

export default CategoryInput;
