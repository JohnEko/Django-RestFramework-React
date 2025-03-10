import { create } from "zustand"


interface AddPropertyModalStore{
    open: () => void 
    close: () => void
    isOpen: boolean

}

const useAddPropertyModal = create<AddPropertyModalStore>((set) => ({
    isOpen: false,
    open: () =>set({isOpen: true}),
    close: () => set({isOpen: false})
    
}));
export default useAddPropertyModal