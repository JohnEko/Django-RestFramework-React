import { create } from "zustand"


interface SignUpModalStore{
    open: () => void 
    close: () => void
    isOpen: boolean

}



const UseSignUpModal = create<SignUpModalStore>((set) => ({
    isOpen: false,
    open: () =>set({isOpen: true}),
    close: () => set({isOpen: false})
    
}));
export default UseSignUpModal