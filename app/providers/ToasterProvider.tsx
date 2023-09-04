'use client';

import { Toaster } from 'react-hot-toast';

type Props = {};

const ToasterProvider = (props: Props) => {
    return (
        <Toaster
            toastOptions={{
                // style: {
                //     background: '#333',
                //     color: '#fff',
                // },
                duration: 5000,
            }}
        />
    );
};

export default ToasterProvider;
