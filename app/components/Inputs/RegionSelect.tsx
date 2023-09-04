'use client';

import Select from 'react-select';
import useRegions from '@/app/hooks/useRegions';

export type RegionSelectValue = {
    label: string;
    latlng: string;
    value: string;
};

type Props = {
    value?: RegionSelectValue;
    onChange: (value: RegionSelectValue) => void;
};

const RegionSelect = ({ value, onChange }: Props) => {
    const { getAll } = useRegions();

    return (
        <div className="">
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as RegionSelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div>{option.value}</div>
                        <div>{option.label}</div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg',
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6',
                    },
                })}
            />
        </div>
    );
};

export default RegionSelect;
