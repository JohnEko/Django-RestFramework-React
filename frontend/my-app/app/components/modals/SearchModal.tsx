'use client'

import Modal from "./Modals"
import useSearchLoginModal from "@/app/hooks/useSearchModal"
import SelectCountry, {SelectCountryValue} from "../forms/SelectCountry" 
import { useState } from "react"
import { Range } from "react-date-range"
import CustomeButton from "../forms/CustomButton"
import DatePicker from "../forms/Calender"

// we import calender for use to use it we need to set initial date range
//to get the dates we want to checkin and out 
const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () => {

    let content = (<></>);
    const searchModal = useSearchLoginModal();
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [country, setCountry] = useState<SelectCountryValue>();
    const [numGuests, setNumGuests] = useState<string>('1')
    const [numBedrooms, setNumBedrooms] = useState<string>('1')
    const [numBathrooms, setNumBathrooms] = useState<string>('1')

    //Create a function that will search all the details the user has parse from the backend
    const closeAndSearch = () => {
        searchModal.close()
    }


    //when we set the date range to see user detailsfor checkin and checkout
    const _setDateRange = (selection: Range) => {
        if (searchModal.step === 'checkin') {
            searchModal.open('checkout')
        } else if (searchModal.step === 'checkout') {
            searchModal.open('details')
        }
    }

    //Contents


//get the selected country value and the country choosen
    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where is your Location</h2>
            
            <SelectCountry 
                value={country}
                onChange={(value) => setCountry(value as SelectCountryValue)}
            />
            {/* USE THE CUSTOMBUTTON CREATED  when click the button you procced*/}
            <div className="mt-6 flex flex-row gap-4">
                <CustomeButton 
                    label="Check in date"
                    onClick={() => searchModal.open('checkin')}
                />

            </div>
        </>
    )
    //  creating a check in function for the searchModal where click you check in
    const contentCheckin = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to check in</h2>
            {/* date picker is a function that get the date selection is a property for value */}
            <DatePicker 
                value={dateRange}
                onChange={(value) => setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomeButton 
                    label="Location"
                    onClick={() => searchModal.open('location')}
                />

                <CustomeButton 
                    label="Check out date"
                    onClick={() => searchModal.open('checkout')}
                />

            </div>
        </>
    )
    //  creating a check in function for the searchModal where click you check out
    const contentCheckout = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to check in</h2>
            {/* date picker is a function that get the date selection is a property for value */}
            <DatePicker 
                value={dateRange}
                onChange={(value) => setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomeButton 
                    label="Check in date"
                    onClick={() => searchModal.open('checkin')}
                />

                <CustomeButton 
                    label="Details"
                    onClick={() => searchModal.open('details')}
                />

            </div>
        </>
    )
    // create a useState variables to set the numGuests,bedrooms and bathrooms
    // then add the function inside the if stamement
    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl">Details</h2>
            {/* date picker is a function that get the date selection is a property for value */}
            {/* we need to set some input fields here */}
            <div className="space-y-4">
                <div className="space-y-4">
                    <label>Number of Guests</label>
                    <input 
                        type="number" 
                        min='1' 
                        value={numGuests}
                        placeholder="Number of Guest" 
                        onChange={(e) => setNumGuests(e.target.value)}
                        className="w-full h-14 px-4 border-gray-300 rounded-xl"
                    />
                        

                </div>

                <div className="space-y-4">
                    <label>Number of bedrooms</label>
                    <input 
                        type="number" 
                        min='1' 
                        value={numBedrooms}
                        placeholder="Number of Bedrooms" 
                        onChange={(e) => setNumBedrooms(e.target.value)}
                        className="w-full h-14 px-4 border-gray-300 rounded-xl"
                    />
                        
                </div>

                <div className="space-y-4">
                    <label>Number of Bathrooms</label>
                    <input 
                        type="number" 
                        min='1' 
                        value={numBathrooms}
                        placeholder="Number of Bathrooms" 
                        onChange={(e) => setNumBathrooms(e.target.value)}
                        className="w-full h-14 px-4 border-gray-300 rounded-xl"
                    />
                        

                </div>

            </div>


            <div className="mt-6 flex flex-row gap-4">
                <CustomeButton 
                    label="Check out date"
                    onClick={() => searchModal.open('checkout')}
                />
{/* this will close the detail and search it from the backend */}
                <CustomeButton 
                    label="Search"
                    onClick={closeAndSearch}
                />

            </div>
        </>
    )

    // help to filter to know when you checkin and checkout
    if (searchModal.step == 'location') {
        content = contentLocation;
    } else if (searchModal.step == 'checkin') {
        content = contentCheckin;
    }else if (searchModal.step == 'checkout') {
        content = contentCheckout;
    }else if (searchModal.step == 'details') {
        content = contentDetails;
    }

    return(
        <Modal 
            isOpen = {searchModal.isOpen}
            close={searchModal.close}
            label="Search"
            content={content}
        />
    )

}
export default SearchModal