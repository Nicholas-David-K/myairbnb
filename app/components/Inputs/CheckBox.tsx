'use client';

type CheckBoxProps = {
    id: string;
    label: string;
    description: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    value: boolean;
    onChange: (value: any) => void;
};
const CheckBox = ({
    id,
    label,
    description,
    type = 'checkbox',
    disabled,
    onChange,
    value,
    required,
}: CheckBoxProps) => {
    return (
        <div className="flex items-center gap-x-4 mb-4">
            <input
                disabled={disabled}
                id={id}
                required={required}
                onChange={(value) => onChange(value)}
                type={type}
                checked={value}
                className="text-red-500  bg-rose-100 border-rose-300 rounded-lg w-6 h-6 accent-rose-500"
            />
            <div className="ml-2 flex flex-col text-gray-900">
                <label>
                    <div className="font-semibold">{label}</div>
                </label>
                <div className="text-base">{description}</div>
            </div>
        </div>
    );
};

export default CheckBox;
