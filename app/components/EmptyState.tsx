'use client';

import Button from './Button';
import Heading from './Heading';
import { useRouter } from 'next/navigation';

type Props = {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
};

const EmptyState = ({
    title = 'No exact matches',
    subtitle = 'Try changing or removing some of your filters',
    showReset,
}: Props) => {
    const router = useRouter();

    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center absolute left-[50%] top-5 translate-x-[-50%]">
            <Heading center title={title} subtitle={subtitle} />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        label="Remove all filters"
                        onClick={() => router.push('/')}
                    ></Button>
                )}
            </div>
        </div>
    );
};

export default EmptyState;
