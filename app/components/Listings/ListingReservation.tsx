'use client';

import Button from '../Button';
import Calendar from '../Inputs/Calendar';
import { Range } from 'react-date-range';

type Props = {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
};

const ListingReservation = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabledDates,
    disabled,
}: Props) => {
    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">Ksh. {price}</div>
                <div className="font-light text-neutral-600">/ night</div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
            </div>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>Total</div>
                <div>Ksh. {totalPrice}</div>
            </div>
        </div>
    );
};

export default ListingReservation;
