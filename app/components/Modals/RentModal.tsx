'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useMemo, useState } from 'react';

import CategoryInput from '../Inputs/CategoryInput';
import CheckBox from '../Inputs/CheckBox';
import Counter from '../Inputs/Counter';
import CountrySelect from '../Inputs/RegionSelect';
import Heading from '../Heading';
import ImageUpload from '../Inputs/ImageUpload';
import Input from '../Inputs/Input';
import Modal from './Modal';
import axios from 'axios';
import { categories } from '../Sidebar/Sidebar';
import dynamic from 'next/dynamic';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { toast } from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

//? FORM STEPS
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    ROOMTYPE = 3,
    IMAGES = 4,
    DESCRIPTION = 5,
    PRICE = 6,
}

type Props = {};

const RentModal = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const [step, setStep] = useState(STEPS.CATEGORY);
    const rentModal = useRentModal();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
            roomType: null,
        },
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');
    const roomType = watch('roomType') || 'ENTIRE_PLACE';

    const Map = useMemo(
        () =>
            dynamic(() => import('../Map'), {
                ssr: false,
            }),

        // eslint-disable-next-line
        [location]
    );

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    // next & back
    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    // HANDLE SUBMIT
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        axios
            .post('/api/listings', data)
            .then(() => {
                toast.success('Listing created');
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
            })
            .catch((error) => {
                toast.error('Something went wrong!');
            })
            .finally(() => setIsLoading(false));
    };

    // dynamic action labels
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    // STEP 0: CATEGORY
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map(
                    (item) =>
                        item.label !== 'All' && (
                            <div key={item.label} className="col-span-1">
                                <CategoryInput
                                    onClick={(category) =>
                                        setCustomValue('category', category)
                                    }
                                    selected={category === item.label}
                                    label={item.label}
                                    icon={item.icon}
                                />
                            </div>
                        )
                )}
            </div>
        </div>
    );

    // STEP 1: LOCATION
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }

    // STEP 2: INFO
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have?"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        );
    }

    // STEP 3: ROOMTYPE
    if (step === STEPS.ROOMTYPE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your space"
                    subtitle="What type of space is it?"
                />
                <CheckBox
                    id="EntirePlace"
                    label="Entire Place"
                    description="A place all to yourself."
                    value={roomType === 'ENTIRE_PLACE'}
                    type="radio"
                    onChange={() => setCustomValue('roomType', 'ENTIRE_PLACE')}
                />
                <CheckBox
                    id="PrivateRoom"
                    label="Private Room"
                    description="Your own room in a home or a hotel, plus some shared common spaces."
                    value={roomType === 'PRIVATE_ROOM'}
                    type="radio"
                    onChange={() => setCustomValue('roomType', 'PRIVATE_ROOM')}
                />
                <CheckBox
                    id="isSharedRoom"
                    label="Shared Room"
                    description="A sleeping space and common areas that may be shared with others."
                    value={roomType === 'SHARED_ROOM'}
                    type="radio"
                    onChange={() => setCustomValue('roomType', 'SHARED_ROOM')}
                />
            </div>
        );
    }
    // STEP 4: IMAGES
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        );
    }

    // STEP 5: DESCRIPTION
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    // STEP 6: PRICE
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price?"
                    subtitle="How much do you want to charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    const footerContent = (
        <div className="mt-3 text-xs text-center">
            &copy; {new Date().getFullYear()}, Nicholas. All Rights Reserved.
        </div>
    );

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onSubmit={handleSubmit(onSubmit)}
            onClose={rentModal.onClose}
            title="Airbnb your home!"
            disabled={isLoading}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RentModal;
