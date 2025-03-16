'use client'


import Image from "next/image"
import { ChangeEvent, useState } from "react"
// import LoginModal from "./Login"
import Modal from "./Modals"
import CustomeButton from "../forms/CustomeButton"
import Categories from "../Categories"
import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry"
import apiService from "@/app/services/apiService"
import { useRouter } from "next/navigation"
import { error } from "console"




const AddPropertyModal = () => {
    //
    //States
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState<string[]>([]);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataPrice, setDataPrice] = useState('');
    const [dataBathrooms, setDataBathrooms] = useState('');
    const [dataBedrooms, setDataBedrooms] = useState('');
    const [dataGuests, setDataGuests] = useState('');
    const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
    const [dataImage, setDataImage] = useState<File | null>(null);




    

//also we can use this to organized our comments sections
    const addPropertyModal = useAddPropertyModal();
    const router = useRouter();
    //
    //set data expecting string data 
    const setCategory = (category: string) => {
        setDataCategory(category)
    }
//set the image event want to upload
    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setDataImage(tmpImage);
        }
    }

    //let create a submit button to submit the image to the server lets make it async
    const submitForm = async () =>{
        console.log('submitForm');
        //lets make the valid input
        if (
            dataCategory &&
            dataTitle && 
            dataDescription &&
            dataPrice &&
            dataCountry &&
            dataImage
        ) {
            //lets use inbuild javascript form
            const formData = new FormData()
            formData.append('category', dataCategory)
            formData.append('title', dataTitle)
            formData.append('description', dataDescription)
            formData.append('price', dataPrice)
            formData.append('bedrooms', dataBedrooms)
            formData.append('bathrooms', dataBathrooms)
            formData.append('guests', dataGuests)
            formData.append('country', dataCountry.label)
            formData.append('country_code', dataCountry.value)
            formData.append('image', dataImage)

            //parse the fordata to the apibackend
            const response = await apiService.post('/api/properties/create/', formData)

            if (response.success) {
                console.log('SUCCESS :-D');

                router.push('/')
                addPropertyModal.close()
            }else {
                console.log('Error: there is an error on your image file')
                    //when we encounter error message we print the vslue
                const tmpErrors: string[] = Object.values(response).map((error: any) => {
                    return error
                }) 
                setErrors(tmpErrors)
            }

        }
    }


//using next if statement to check the steps we are the if statement is ?()
    const content = (
        <>
            {currentStep == 1? (
                    <>
                        <h2 className="mb-6 text-2xl">Choose category</h2>
                        {/* //comeback for this error */}
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
                            className="mb-2 bg-black-500 hover:bg-gray-800"
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
                            className="mb-2 bg-black-500 hover:bg-gray-800"
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
                            className="mb-2 bg-black-500 hover:bg-gray-800"
                            onClick={() => setCurrentStep(3)}
                        
                    />

                    <CustomeButton 
                            label="Next"
                            onClick={() => setCurrentStep(5)}
                        
                    />

                </>
            
            ) : (
                <>
                    <h2 className="mb-6 text-2xl">Image</h2>
                    <div className="pt-3 pb-6 space-y-4">
                        <div className="py-4 px-6 bg-gray-600 text-white rounded-xl">
                            <input 
                                type="file"
                                accept="image/*"
                                onChange={setImage} 
                                />

                        </div>

                        {/* // want to upload image */}
                        {dataImage && (
                            <div className="w-[200px] h-[150px] relative">
                                <Image 
                                    fill
                                    alt="upload image"
                                    src={URL.createObjectURL(dataImage)}
                                    className="w-full h-full object-cover rounded-xl"
                                />

                            </div>

                        )}

                    </div>
                        {/* //lets loop through the errors and print it out*/}
                    {errors.map((error, index) => {
                        return(
                            <div
                                key={index}
                                className="p-5 mb-4 bg-red-400 tect-white rounded-xl opacity-80"
                            >
                                {error}

                            </div>
                        )

                    })}
                    <CustomeButton 
                            label="Previous"
                            className="mb-2 bg-black-500 hover:bg-gray-800"
                            onClick={() => setCurrentStep(4)}
                        
                    />

                    <CustomeButton 
                            label="Submit"
                            onClick={submitForm}
                        
                    />
                </>
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