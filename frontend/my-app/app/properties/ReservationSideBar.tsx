'use client';

import { useState, useEffect } from "react";
// react date range is javascript and not typescript so we install react date time
import { Range } from "react-date-range";
import {differenceInDays, eachDayOfInterval, format} from "date-fns";
import DatePicker from "../components/forms/Calender";


import apiService from "../services/apiService";
import UserLoginModal from "../hooks/useLoginModal";
import { setPriority } from "os";
import PropertyList from "../components/property/PropertyList";


const initiaDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

export type Property = {
    id: string;
    guests: number;
    price_per_night: number;
}

interface ReservationSideBarProps {
   userId: string | null,
   property: Property
}

const ReservationSideBar: React.FC<ReservationSideBarProps> =({
    property,
    userId
})=>{
// set an object to call from the frontend to the the data
    const loginModal = UserLoginModal();

    const [fee, setFee] = useState<number>(0);
    const [nights, setNights] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [dateRange, setDateRange] = useState<Range>(initiaDateRange);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [guests, setGuests] = useState<string>('1');
    const guestRange = Array.from({ length: property.guests}, (_, index) => index + 1)


// creating when a guest is performing booking if user login
   const performBooking = async () =>{
    if (userId){
        if (dateRange.startDate && dateRange.endDate){
            const formdata = new FormData();
            formdata.append('gusets', guests);
            formdata.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
            formdata.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
            formdata.append('number_of_nights', nights.toString());
            formdata.append('total_price', totalPrice.toString());

//we can call the backend api to post this request
            const response = await apiService.post(`/api/properties/${property.id}/book/`, formdata);

            if (response.success){
                console.log("Booking successful")
            } else {
                console.log("something went wrong....")
            }
        }
    }else {
        loginModal.open()
    }
   }


// Getting the specific date the gusts has booked and the end date
    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate)
        const newEndDate = new Date(selection.endDate)

        if (newEndDate <= newStartDate){
            newEndDate.setDate(newStartDate.getDate() + 1);
        }
    
        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate
        })
    }
// Lets create a use effect when the page load and calender changes we see the instant data 
//make sure the enddate start first and the 5 is a percentage discounts
// GET THE TOTAL PRICE PER NIGHT AND THE FEE IF WE HAVE A GUEST
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );
            if (dayCount && property.price_per_night) {
                const _fee = ((dayCount * property.price_per_night) / 100) * 5;

                setFee(_fee);
                setTotalPrice((dayCount * property.price_per_night) + _fee)
                setNights(dayCount)
            }else{
                const _fee = (property.price_per_night / 100) * 5

                setFee(_fee)
                setTotalPrice(property.price_per_night + _fee)
                setNights(1)
            }
        }
    })

    return(
        // we want spaces above and below rigth side and left side
        //Height and width makes the box to the bottom of page and mb give space
        <>
            <aside className="h-screen w-[470px] mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">

                <h2><strong>Total price</strong></h2>
                <p className="mb-5 text-2xl">{property.price_per_night}</p>

                {/* we can insert out date calenter here we can create setdateRange function above*/}
                <DatePicker 
                    value={dateRange}
                    onChange={(value) => _setDateRange(value.selection)}
                />
                
                {/* Lets create dropdown  using a div class*/}
                <div className="mb-3 p-1 border border-gray-400 rounded-xl">
                    <label className="mb-2 block font-bold text-xs">Guest</label>
                    {/* //SETTING THE VALUE OF THE GUESTS AND RUN SOME LOOP */}
                    <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)} 
                        className="w-full -ml-1 text-ax">
                                {/* get the number of guest selected and print the number  */}
                            {guestRange.map(number =>
                                <option key={number} value={number}>{number}</option>
                            )}
                    </select>
                </div>
                {/* for rental amount reservation and each person x the total person */}
                {/* we can create button with this for selected input in future */}
                {/* when we click the book the data will be sent to backend guset book has been reserve */}
                <div 
                    onClick={performBooking}
                    className="w-full text-center font-bold mb-3 py-3 bg-red-500 hover:bg-airbnb-dark rounded-xl">
                    Book
                </div>
                {/* Lets get the price the fee and the total amount  */}
                <div className="mb-4 flex flex justify-between align-center">
                    <p>${property.price_per_night} * {nights} nights</p>
                    <p>${property.price_per_night * nights}</p>
                </div>

                <div className="mb-4 flex flex justify-between align-center">
                    <p>Charges Fee</p>
                    <p>${fee}</p>
                </div>
                <hr />

                <div className="mb-4 flex flex justify-between align-center font-bold">
                    <p>Total</p>
                    <p>${totalPrice}</p>
                </div>
       
            </aside>
            
        </>

            


    )

}
export default ReservationSideBar