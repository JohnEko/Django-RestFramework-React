'use client'


import Image from "next/image"
import { useState } from "react"
// import LoginModal from "./Login"
import Modal from "./Modals"
import CustomeButton from "../forms/CustomeButton"
import Categories from "../Categories"
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal"




const AddPropertyModal = () => {
    //
    //States
    const [currentStep, setCurrentStep] = useState(1);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');




    const addPropertyModal = useAddPropertyModal();
    //
    //set data expecting string data 
    const setCategory = (category: string) => {
        setDataCategory(category)
    }

//using next if statement to check the steps we are the if statement is ?()
    const content = (
        <>
            {currentStep == 1? (
                    <>
                        <h2 className="mb-6 text-2xl">Choose category</h2>
                        <Categories
                        //comeback for this error
                            dataCategory={dataCategory}
                            setCategory={(category: string) => setCategory(category)} 
                           
                        />

                        <CustomeButton 
                            label="Next"
                            onClick={() => setCurrentStep(2)}
                        
                        />
                    </>
            ): currentStep == 2 ? (
                <>
                     <h2 className="mb-6 text-2xl">Describe your place</h2>
                     <div className="pt-3 pb-6 space-y-4">
                        
                     </div>

                     <CustomeButton 
                            label="Previous"
                            className="mb-2 bg-black hover:bg-gray-800"
                            onClick={() => setCurrentStep(2)}
                        
                    />

                     <CustomeButton 
                            label="Next"
                            onClick={() => setCurrentStep(3)}
                        
                        />
                </>
            ) : (
                <p>this</p>
            )}
        </>
    )

    return(
        <>
            <Modal 
                isOpen={addPropertyModal.isOpen}
                close={addPropertyModal.close}
                label="Add Property"
                content={content}
               
            />
        </>
    )

}
export default AddPropertyModal