import { Search } from "lucide-react"
import { Input } from "postcss"



const  SearchFilters = () =>{

return(

    <div className="h-[40px] lg:h-[64] flex flex-row item-center justify-between border rounded-full"> 
        <div className="hidden lg:block">
            <div className="flex flew-row items-center justify-between">
                <div className="cursor-pointer w-[250px] h-[40px] px-8 justify-center flex flex-col rounded-full hover:bg-gray-100">
                    <p className="text-xs font-semibold">Search</p>
                    <p className="text-s font-semibold">Most Search</p>
                </div>

                <div className="cursor-pointer h-[40px] px-8 justify-center flex flex-col rounded-full hover:bg-gray-100">
                    <p className="text-xs font-semibold">Features</p>
                    <p className="text-s font-semibold">New Features</p>
                </div>

                <div className="cursor-pointer h-[40px] px-8 justify-center flex flex-col rounded-full hover:bg-gray-100">
                    <p className="text-xs font-semibold">Trending</p>
                    <p className="text-s font-semibold">Recent Trend</p>
                </div>

                    {/* Search fields for new fields */}
                <div className="search__input border-[2px] border-solid border-slate-500 flex flex-row items-center gap-5 p-1 rounded-[15px]">
                    <div className="relative">
                        <Search className="absolute left-3 h-4 w-4 top-1 text-muted-foreground" />                    
                        <input type="q" placeholder="Search topic...." className="pl-9 w-full" />
                    </div>

                </div>
            

            </div>
            {/* This for airbnb search button check later */}
            
                <div className="p-2">
                    <div className="cursor-pointer p-2 lg:p-4 big-airbnb hover:bg-airbnb-dark transition rounded-full text-white">
                        <svg
                            viewBox="0 0 32 32"
                            style={{display: 'black', fill: 'none', height: '16px', strokeWidth:4, overflow:'visible'}}
                            aria-hidden='true' role="presentation" focusable="false"
                            >
                            <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9" />
                        </svg>
                    </div>
                </div>
           
        </div>
    </div>

)

}

export default SearchFilters