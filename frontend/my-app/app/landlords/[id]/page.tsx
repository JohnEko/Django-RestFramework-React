import ContactButton from "@/app/components/ContactButton"
import PropertyList from "@/app/components/property/PropertyList"
import Image from "next/image"

const LandlordDetailPage = () =>{

    return(
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* for the left side */}
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        <Image 
                            src="/Jerry.jpg"
                            width={200}
                            height={200}
                            alt="Landlord name"
                            className="rounded-full"
                        
                        />

                        <h1 className="mt-6 text-2xl">Landlord Name</h1>

                        <ContactButton />
                    </div>
                </aside>

                {/* this shift the text to the right place 
                and if we want to get the tpix horizontally we use this
                On smaller devices col-span-1  and larger devices md:col-span-3
                to make the screen balance check the top dev col-span on smaller and larger devices*/}
                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <PropertyList />
                    </div>
                   
                </div>
            </div>

            

        </main>
    )
}
export default LandlordDetailPage