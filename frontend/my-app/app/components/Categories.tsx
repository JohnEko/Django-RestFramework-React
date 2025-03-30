'use client'

import { useState } from "react"
import Image from "next/image"
import useSearchModal, {SearchQuery} from "../hooks/useSearchModal"

const Categories = () =>{

    const searchModal = useSearchModal()
    const [category, setCategory] = useState('')

    // we use underscore not to overide the category function sets
    //when this function is called it gose to propertyList and getProperty function
    const _setCategory = (_category: string) => {
        setCategory(_category)

        const query: SearchQuery = {
            country: searchModal.query.country,
            checkIn: searchModal.query.checkIn,
            checkOut: searchModal.query.checkOut,
            guests: searchModal.query.guests,
            bathrooms: searchModal.query.bathrooms,
            bedrooms: searchModal.query.bedrooms,
            category: _category
        }
        //then we call the function from the dive below
        searchModal.setQuery(query)
    }

// we will add this to the front page, page.tsx
// the Home icon on the feed page
//this is the page for feeds categories we like to add on the frontpage
    return(
        <div className="pt-3 cursor-pointer pb-6 flex item-center space-x-12">
            {/* lets create firist category  the class helps our knows which category we are on*/}
            <div 
                onClick={() => _setCategory('')}
                className={`pb-4 flex-col items-center space-y-2 border-b-2 ${category == '' ? 'border-black': 'border-white'} opacity-60 hover:vorder-gray-200 hover:opacity-100`}>
                <Image
                src="/bnb.jpg"
                alt="Beach_house"
                width={20}
                height={20}
                
                />

                <span className="text-xs font-semibold">All</span>
            </div>

            <div 
                onClick={() => _setCategory('Home')}
                className={`pb-4 flex-col items-center space-y-2 border-b-2 ${category == 'Home' ? 'border-black': 'border-white'} opacity-60 hover:vorder-gray-200 hover:opacity-100`}>
                <Image
                src="/bnb.jpg"
                alt="Beach_house"
                width={20}
                height={20}
                
                />

                <span className="text-xs font-semibold">Home</span>
            </div>

            <div 
                onClick={() => _setCategory('Villas')}
                className={`pb-4 flex-col items-center space-y-2 border-b-2 ${category == 'Villas' ? 'border-black': 'border-white'} opacity-60 hover:vorder-gray-200 hover:opacity-100`}>
                <Image
                src="/bnb.jpg"
                alt="Beach_house"
                width={20}
                height={20}
                
                />

                <span className="text-xs font-semibold">Villas</span>
            </div>

            <div 
                onClick={() => _setCategory('News')}
                className={`pb-4 flex-col items-center space-y-2 border-b-2 ${category == 'News' ? 'border-black': 'border-white'} opacity-60 hover:vorder-gray-200 hover:opacity-100`}>
                <Image
                src="/bnb.jpg"
                alt="Beach_house"
                width={20}
                height={20}
                
                />

                <span className="text-xs font-semibold">News</span>
            </div>

            <div 
                onClick={() => _setCategory('Japa')}
                className={`pb-4 flex-col items-center space-y-2 border-b-2 ${category == 'Japa' ? 'border-black': 'border-white'} opacity-60 hover:vorder-gray-200 hover:opacity-100`}>
                <Image
                src="/bnb.jpg"
                alt="Beach_house"
                width={20}
                height={20}
                
                />

                <span className="text-xs font-semibold">Japa</span>
            </div>
            
        </div>
    )
} 
export default Categories