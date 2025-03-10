'use client'


import Image from "next/image"
import LoginModal from "./Login"
import Modal from "./Modals"
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal"


const AddPropertyModal = () => {
    const addPropertyModal = useAddPropertyModal()

    return(
        <>
            <Modal 
                isOpen={addPropertyModal.isOpen}
                close={addPropertyModal.close}
                label="Add Property"
                content={(
                    <p>Get</p>
                )}
            />
        </>
    )

}
export default AddPropertyModal