import Image from "next/image"

const Categories = () =>{
// we will add this to the front page, page.tsx
//this is the page for feeds categories we like to add on the frontpage
    return(
        <div className="pt-3 cursor-pointer pb-6 flex item-center space-x-12">
            {/* lets create firist category */}
            <div className="pb-4 flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:vorder-gray-200 hover:opacity-100">
                <Image
                src="/bnb.jpg"
                alt="Beach_house"
                width={20}
                height={20}
                
                />

                <span className="text-xs">Home</span>
            </div>

            <div className="pb-4 flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:vorder-gray-200 hover:opacity-100">
                <Image
                src="/bnb.jpg"
                alt="Beach_house"
                width={20}
                height={20}
                
                />

                <span className="text-xs">Sports</span>
            </div>

            <div className="pb-4 flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:vorder-gray-200 hover:opacity-100">
                <Image
                src="/bnb.jpg"
                alt="Beach_house"
                width={20}
                height={20}
                
                />

                <span className="text-xs">News</span>
            </div>

            <div className="pb-4 flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:vorder-gray-200 hover:opacity-100">
                <Image
                src="/bnb.jpg"
                alt="Beach_house"
                width={20}
                height={20}
                
                />

                <span className="text-xs">Japa</span>
            </div>
        </div>
    )
} 
export default Categories