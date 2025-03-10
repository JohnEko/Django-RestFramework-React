

import Link from "next/link";
import SearchFilters from "./SearchFilters"
import UserNav from "./UserNav";
import { getUserId } from "@/app/lib/actions";
import AddPropertyButton from "./AddPropertyButton";
// import AddProperttyButton from ./components/AddProperttyButton


const Navbar = async () =>{
    const userId = await getUserId();

    return(
        <nav className="w-full fixed top 0 left-0 py-6 border-b bg-white z-100">
            <div className="max-w-[1500px] mx-auto px-6">
                <div className="flex justify-between item-center ">
                    
                    <Link href="/" className="p-2">
                        {/* <Image 
                            src=""
                            alt="Amebonaija"
                            width={100}
                            height={38}
                         /> */}

                      
                        Amebonaija
                    </Link>

                    {/* lets create the search filters */}

                    <div className="flex space-x-5">
                        <SearchFilters />
                    </div>

                    <div className="flex item-center space-x-1">
                    
                    <AddPropertyButton />
                    <UserNav 
                        userId ={userId}
                    />
                    </div>
                    
                 </div>
            </div>
        </nav>
    )

} 

export default Navbar;