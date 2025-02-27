import Image from "next/image"
import ReservationSideBar from "../ReservationSideBar"
 
 const ProperDetailsPage = () =>{

    return(
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-x1 relative">
                <Image 
                    fill
                    src='/BeachPhoto.jpg'
                    className="object-cover w-full h-full"
                    alt="Beach surrounding"
                
                />
                {/* Lets make the screen be seperated 
                so we can get information from the property */}
            </div>
            {/* //This div class grid col makes the reservation share the screen bord with the property */}
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h3 className="mb-4 text-4xl">Details</h3>

                    <span className="mb-6 block text-lg text-gray-600">
                        4 guest -2 bathroom -3 bedroom
                    </span>
                        <hr />
                    <div className="py-6 flex item-center space-x-4">
                        <Image 
                            src="/Jerry.jpg"
                            width={50}
                            height={50}
                            className="rounded-full"
                            alt="The user name"
                        
                        />
                        <p><strong>Jame Simon</strong> is your Author and Host</p>

                    </div>
                    <hr />
                    <p className="mt-6 text-lg">
                    Chelsea should be Lookman’s next home because the style of play suits what Enzo Maresca looks for in his strikers. He’s fast, technically gifted, can dribble, create chances and score a lot of goals. With all due respect, most 
                    Chelsea strikers struggle to bring out two of those qualities.”
                    </p>
                </div>

                <div>
                    <ReservationSideBar />
                    

                </div>

            </div>
      

        </main>
    )
 }
 export default ProperDetailsPage