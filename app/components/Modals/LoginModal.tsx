'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';

import { AiFillGithub } from 'react-icons/ai';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import Modal from './Modal';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useRouter } from 'next/navigation';

type Props = {};

const LoginModal = (props: Props) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        // TODO: axios request
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error('Something went wrong. Try again!');
            }
        });
    };

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading center title="Welcome back" subtitle="Login to your account!" />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="password"
                required
            />
        </div>
    );

    const FooterContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                onClick={() => signIn('google')}
                outline
                label="Continue with Google"
                icon={FcGoogle}
            />
            <Button
                onClick={() => signIn('github')}
                outline
                label="Continue with GitHub"
                icon={AiFillGithub}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row justify-center items-center gap-2">
                    <div>Don&rsquo;t have an account?</div>
                    <div
                        onClick={toggle}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Create and account
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={FooterContent}
            className="xl:w-[25%]"
        />
    );
};

export default LoginModal;
