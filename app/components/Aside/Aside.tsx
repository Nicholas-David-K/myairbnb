'use client';

import React, { useCallback, useEffect, useState } from 'react';

import Button from '../Button';
import { MdClose } from 'react-icons/md';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
};

const Aside = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
}: Props) => {
    const [showAside, setShowAside] = useState(isOpen);

    useEffect(() => {
        setShowAside(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowAside(false);

        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed z-10 inset-0 outline-none focus:outline-none bg-neutral-800/20">
                <div
                    className={`fixed right-0 h-full w-full lg:w-[600px] transition-all overflow-y-auto z-10
                    duration-500 bg-white translate border-0 shadow-lg flex flex-col outline-none focus:outline-none,
                    ${showAside ? 'translate-x-0' : 'translate-x-full'}
                    ${showAside ? 'opacity-100' : 'opacity-0'}
                    pt-20`}
                >
                    {/* CONTENT */}
                    <div className="flex items-center p-6 justify-between relative border-b-[0.5px]">
                        <div className="text-lg font-bold text-rose-500">
                            {title}
                        </div>
                        <div
                            onClick={handleClose}
                            className="flex lg:hidden flex-row items-center p-3 bg-rose-500 text-white group hover:bg-black drop-shadow-md 
                                gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                        >
                            <MdClose className="text-1xl group-hover:text-white" />
                        </div>
                    </div>
                    {/* BODY */}
                    <div className="relative p-6 flex-auto">{body}</div>

                    {/* FOOTER */}
                    <div className="flex flex-col gap-2 p-6">
                        <div className="flex flex-row items-center gap-4 w-full">
                            {secondaryAction && secondaryActionLabel && (
                                <Button
                                    outline
                                    disabled={disabled}
                                    label={secondaryActionLabel}
                                    onClick={handleSecondaryAction}
                                />
                            )}
                            <Button
                                disabled={disabled}
                                label={actionLabel}
                                onClick={handleSubmit}
                            />
                        </div>
                        {footer}
                    </div>
                </div>
                <div
                    onClick={handleClose}
                    className="p-3 bg-rose-500 group hover:bg-black drop-shadow-md lg:flex hidden flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition absolute top-24 right-[44rem] z-10"
                >
                    <MdClose className="text-2xl group-hover:text-white text-white" />
                </div>
            </div>
        </>
    );
};

export default Aside;
