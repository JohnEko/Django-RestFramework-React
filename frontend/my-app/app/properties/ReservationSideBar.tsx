
const ReservationSideBar =()=>{

    return(
        // we want spaces above and below rigth side and left side
        //Height and width makes the box to the bottom of page and mb give space
        <>
            <aside className="h-screen w-[470px] mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">

                <h2><strong>Check whats trending now</strong></h2>
                <p className="mb-5 text-2xl">Get cheap accoumodation $10 per night</p>
                
                {/* Lets create dropdown  using a div class*/}
                <div className="mb-3 p-1 border border-gray-400 rounded-xl">
                    <label className="mb-2 block font-bold text-xs">Guest</label>
                    <select className="w-full -ml-1 text-ax">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </div>
                {/* for rental amount reservation and each person x the total person */}
                {/* we can create button with this for selected input in future */}
                <div className="w-full text-center font-bold mb-3 py-3 bg-airbnb hover:bg-airbnb-dark rounded-xl">
                    Book
                    </div>

                <div className="mb-4 flex flex justify-between align-center">
                    <p>$100 * 4</p>
                    <p>$400</p>
                </div>

                <div className="mb-4 flex flex justify-between align-center">
                    <p>Django React</p>
                    <p>$40</p>
                </div>
                <hr />

                <div className="mb-4 flex flex justify-between align-center font-bold">
                    <p>Total</p>
                    <p>$400</p>
                </div>
       
            </aside>
            
        </>

            


    )

}
export default ReservationSideBar