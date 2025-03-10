'use client'

import useAddPropertyModal from "@/app/hooks/useAddPropertyModal"
import AddPropertyModal from "../modals/AddPropertyModal"

const AddPropertyButton = () =>{
    const addPropertyModal = useAddPropertyModal()
    const airbnbYourHome = () => {
        addPropertyModal.open()
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