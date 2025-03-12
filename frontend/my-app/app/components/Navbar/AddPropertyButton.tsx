'use client'

import UserLoginModal from "@/app/hooks/useLoginModal"
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal"
import AddPropertyModal from "../modals/AddPropertyModal"
import React from "react";

//we need to add login modal so user need to be login user
interface AddPropertyButtonProps{
    userId?: string | null;
}

//making it to be use react function
const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
    userId
}) =>{
    const loginModal = UserLoginModal();
    const addPropertyModal = useAddPropertyModal()

    const airbnbYourHome = () => {
        if (userId){
            addPropertyModal.open()
        }else{
            loginModal.open()
        }
    }
    // we need to create space for this
    //this is the icon on the left side
    return(
        <div 
            onClick={airbnbYourHome}
            className="p-2 cursor-pointer text-sm font-semibold rounded-full hover:bg-gray-200">
        <h3><strong>Amebonaija</strong></h3>

        </div>
    )
}
export default AddPropertyButton