'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import { BiDollar } from 'react-icons/bi';

type InputProps = {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    formatPrice?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
};

const Input = ({
    id,
    label,
    type = 'text',
    disabled,
    required,
    placeholder,
    formatPrice,
    register,
    errors,
}: InputProps) => {
    return (
        <div className="w-full relative">
            {formatPrice && (
                <div className="text-neutral-700 absolute font-semibold text-xs top-7 left-2">
                    Ksh.
                </div>
            )}
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder={placeholder}
                type={type}
                className={`peer w-full p-3 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
				${formatPrice ? 'pl-9' : 'pl-4'}
				${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
				${errors[id] ? 'focus:border-rose-500' : 'focus:border-neutral-400'}
				`}
            />
            <label
                className={`
				absolute 
				text-sm
				duration-150 
				transform 
				-translate-y-3
				top-5
				z-10 
				origin-[0] 
				${formatPrice ? 'left-9' : 'left-4'} 
				peer-placeholder-shown:scale-100
				peer-placeholder-shown:translate-y-0 
				peer-focus:scale-75 
                peer-focus:text-rose-500
                peer-focus:font-semibold
				peer-focus:-translate-y-3
				${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
				`}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
