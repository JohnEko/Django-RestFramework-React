import { create } from "zustand"


interface LoginModalStore{
    open: () => void 
    close: () => void
    isOpen: boolean

}



const UserLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    open: () =>set({isOpen: true}),
    close: () => set({isOpen: false})
    
}));
export default UserLoginModal