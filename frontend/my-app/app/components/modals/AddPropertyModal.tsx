'use client'


import Image from "next/image"
import { useState } from "react"
// import LoginModal from "./Login"
import Modal from "./Modals"
import CustomeButton from "../forms/CustomeButton"
import Categories from "../Categories"
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry"




const AddPropertyModal = () => {
    //
    //States
    const [currentStep, setCurrentStep] = useState(1);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataPrice, setDataPrice] = useState('');
    const [dataBathrooms, setDataBathrooms] = useState('');
    const [dataBedrooms, setDataBedrooms] = useState('');
    const [dataGuests, setDataGuests] = useState('');
    const [dataCountry, setDataCountry] = useState<SelectCountryValue>();






//also we can use this to organized our comments sections
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
                        //comeback for this error
                        <Categories
                            dataCategory ={dataCategory}
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
                            <div className="flex flex-col space-y-2">
                                <label>Title</label>
                                <input 
                                    type="text" 
                                    value={dataTitle}
                                    onChange={(e) => setDataTitle(e.target.value)}
                                    className="w-full p-4 border border-gray-600 rounded-xl"
                                />

                            </div>

                            <div className="flex flex-col space-y-2">
                                <label>Description</label>
                                <textarea 
                                    value={dataDescription}
                                    onChange={(e) => setDataDescription(e.target.value)}
                                    className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                                ></textarea>

                            </div>
                        
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
            ) : currentStep == 3 ? (
                <>
                 <h2 className="mb-6 text-2xl">Details of your place</h2>
                 <div className="pt-3 pb-6 space-y-4">
                            <div className="flex flex-col space-y-2">
                                <label>Price per night</label>
                                <input 
                                    type="numbers" 
                                    value={dataPrice}
                                    onChange={(e) => setDataPrice(e.target.value)}
                                    className="w-full p-4 border border-gray-600 rounded-xl"
                                />

                            </div>

                            <div className="flex flex-col space-y-2">
                                <label>Bedrooms</label>
                                <input 
                                    type="text" 
                                    value={dataBedrooms}
                                    onChange={(e) => setDataBedrooms(e.target.value)}
                                    className="w-full p-4 border border-gray-600 rounded-xl"
                                />
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label>Bathrooms</label>
                                <input 
                                    type="text" 
                                    value={dataBathrooms}
                                    onChange={(e) => setDataBathrooms(e.target.value)}
                                    className="w-full p-4 border border-gray-600 rounded-xl"
                                />
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label>Number of Guest</label>
                                <input 
                                    type="text" 
                                    value={dataGuests}
                                    onChange={(e) => setDataGuests(e.target.value)}
                                    className="w-full p-4 border border-gray-600 rounded-xl"
                                />

                            </div>
                    </div>
                    <CustomeButton 
                            label="Previous"
                            className="mb-2 bg-black hover:bg-gray-800"
                            onClick={() => setCurrentStep(2)}
                        
                    />

                    <CustomeButton 
                            label="Next"
                            onClick={() => setCurrentStep(4)}
                        
                    />

                </>
            ) : currentStep == 4 ? (
                <>
                
                    <h2 className="mb-6 text-2xl">Location</h2>
                    <div className="pt-3 pb-6 space-y-4">
                        <SelectCountry 
                            value={dataCountry}
                            onChange={(value:any) => setDataCountry(value as SelectCountryValue)}
                        />
                    </div>


                    <CustomeButton 
                            label="Previous"
                            className="mb-2 bg-black hover:bg-gray-800"
                            onClick={() => setCurrentStep(2)}
                        
                    />

                    <CustomeButton 
                            label="Next"
                            onClick={() => setCurrentStep(4)}
                        
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