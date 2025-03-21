
import Image from "next/image"
import ReservationSideBar from "../ReservationSideBar"
 
import apiService from "@/app/services/apiService";
import { stringify } from "node:querystring";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { parseAppSegmentConfig } from "next/dist/build/segment-config/app/app-segment-config";
import { json } from "node:stream/consumers";
import { parseArgs } from "node:util";

// this params comes from the properties [id]

const ProperDetailsPage = async ({params}: {params: {id: string}}) =>{
    // parsing the id return a errors 
    const property = await apiService.get(`/api/properties/${params.id}`)
    

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
                    <h3 className="mb-4 text-4xl">{property.title}</h3>

                    <span className="mb-6 block text-lg text-gray-600">
                    {property.guests} guest {property.bedrooms} bathroom {property.bathrooms} bedroom
                    </span>
                        <hr />

                    <div className="py-6 flex item-center space-x-4">
                        {/* lets make an if statement here if the user have a image we show the url else no url */}
                        {property.name && (
                            <Image 
                                src={property.landlord.avatar}
                                width={50}
                                height={50}
                                className="rounded-full"
                                alt="The user name"
                            
                            />
                    )}
                        <p><strong>{property.landlord.name}</strong> is your Host</p>

                    </div>
                    <hr />
                    <p className="mt-6 text-lg">
                    {property.description}
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