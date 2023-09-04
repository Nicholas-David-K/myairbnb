import { create } from 'zustand';

type ListingPageProps = {
    isOpen: boolean;
    id: string;
    onOpen: (id: string) => void;
    onClose: () => void;
};

const useListingPage = create<ListingPageProps>((set) => ({
    isOpen: false,
    id: '',
    onOpen: (id: string) => set({ isOpen: true, id: id }),
    onClose: () => set({ isOpen: false }),
}));

export default useListingPage;
