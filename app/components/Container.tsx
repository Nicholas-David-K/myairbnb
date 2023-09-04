'use client';

type Props = {
    children: React.ReactNode;
};

const Container = ({ children }: Props) => {
    return <div className="max-w-[2530px] px-4">{children}</div>;
};

export default Container;
