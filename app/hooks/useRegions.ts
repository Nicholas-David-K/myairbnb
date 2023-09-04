//@ts-ignore

import { counties } from 'kenya';

const formattedCounties = counties.map((county: any) => ({
    value: county.code,
    label: county.name,
    latlng: [county.center.lat, county.center.lon],
}));

const useRegions = () => {
    const getAll = () => formattedCounties;

    const getByValue = (value: string) => {
        return formattedCounties.find((item: any) => item.value === value);
    };

    return {
        getAll,
        getByValue,
    };
};

export default useRegions;
