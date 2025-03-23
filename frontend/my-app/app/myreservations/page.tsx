import Image from "next/image"
import Link from "next/link"
import apiService from "../services/apiService"
//import { useRouter } from "next/navigation"

const MyReservationPage = async () =>{
    //const router = useRouter();
    const reservations = await apiService.get('/api/auth/myreservations/')
// can create a table row inside this box with different links or href tag
// for smaller and lager devices  grid grid-col-1 md:grid-cols-4 gap-4
    return(
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
           
            <h1 className="my-6 text-2xl">Reservation</h1>
            <div className="space-y-4">
                {reservations && reservations.map && reservations.map((reservation : any) => {
                    return(
                        <div className="p-5 grid grid-col-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                            <div className="col-span-1">
                                <div className="relative overflow-hidden aspect-square rounded-xl">
                                    <Image 
                                        fill
                                        src='/villa.jpg'
                                        className="hover:scale-110 object-cover transition h-screen w-full"
                                        alt="Beach"
                                    />
                                </div>
                            </div>

                                {/* we create space in each of the links or elements 
                                for smaller and lager devices col-span-1 md:col-span-3 */}
                            <div className="col-span-1 md:col-span-3">
                                <h2 className="mb-4 text-xl font-bold">{reservation.property.title}</h2>

                                <p className="space-y-2"><strong>Check in date:</strong>{reservation.start_date}</p>
                                <p className="space-y-2"><strong>Checkout date:</strong>{reservation.end_date}</p>

                                <p className="space-y-2"><strong>Number of Nights:</strong>{reservation.number_of_night}</p>
                                <p className="space-y-2"><strong>Total price:</strong> ${reservation.totalPrice}</p>
                            
                                <Link
                                    href={`/property/${reservation.property.id}`}
                                    className="mt-6 inline-block cursor-pointer py-4 px-6 bg-red-500 text-gray font-bold rounded-xl"
                                    >
                                    My Reservation
                                
                                </Link>
                            
                            </div>
                                
                            
                        </div>
                    )
            })}  
              </div>  
           
        
        </main>

    )
}
export default MyReservationPage
