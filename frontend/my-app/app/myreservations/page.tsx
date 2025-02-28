import Image from "next/image"

const MyReservationPage = () =>{
// can create a table row inside this box with different links or href tag
// for smaller and lager devices  grid grid-col-1 md:grid-cols-4 gap-4
    return(
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
           
            <h1 className="my-6 text-2xl">Reservation</h1>
            <div className="space-y-4">
                <div className="p-5 grid grid-col-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image 
                                fill
                                src="/BeachPhoto.jpg"
                                className="hover:scale-110 object-cover transition h-screen w-full"
                                alt="Beach"
                            />
                        </div>
                    </div>

                        {/* we create space in each of the links or elements 
                        for smaller and lager devices col-span-1 md:col-span-3 */}
                    <div className="col-span-1 md:col-span-3">
                        <h2 className="mb-4 text-xl font-bold">Property Name</h2>

                        <p className="space-y-2"><strong>Check in date:</strong> 21/12/2025</p>
                        <p className="space-y-2"><strong>Checkout date:</strong> 31/01/2026</p>

                        <p className="space-y-2"><strong>Number of nigth:</strong> 40</p>
                        <p className="space-y-2"><strong>Total price:</strong> $800</p>

                        <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-gray font-bold rounded-xl">My Reservation</div>
                    </div>

                    
                </div>

                <div className="p-5 grid grid-col-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image 
                                fill
                                src="/BeachPhoto.jpg"
                                className="hover:scale-110 object-cover transition h-screen w-full"
                                alt="Beach"
                            />
                        </div>
                    </div>

                        {/* we create space in each of the links or elements */}
                    <div className="col-span-1 md:col-span-3">
                        <h2 className="mb-4 text-xl font-bold">Property Name</h2>

                        <p className="space-y-2"><strong>Check in date:</strong> 21/12/2025</p>
                        <p className="space-y-2"><strong>Checkout date:</strong> 31/01/2026</p>

                        <p className="space-y-2"><strong>Number of nigth:</strong> 40</p>
                        <p className="space-y-2"><strong>Total price:</strong> $800</p>

                        <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-gray font-bold rounded-xl">My Reservation</div>
                    </div>             
                </div>
                
            </div>
        
        </main>

    )
}
export default MyReservationPage
