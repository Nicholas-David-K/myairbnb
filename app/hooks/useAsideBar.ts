import { create } from 'zustand';

type AsideBarProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useAsideBar = create<AsideBarProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useAsideBar;
