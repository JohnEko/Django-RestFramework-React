'use client';

import { format } from "date-fns";
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation";
import PropertyListItem from "./PropertyListItem"
import apiService from "@/app/services/apiService";
import useSearchModal from "@/app/hooks/useSearchModal";




export type PropertyType ={
    id:string;
    title: string;
    category:string
    image:string
    is_favorite: boolean
}

interface PropertyListProps {
    landlord_id?: string | null;
    favorites?: boolean  | null;
}

const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id,
    favorites

}) =>{
    const params = useSearchParams()
    const searchModal = useSearchModal()
    const country = searchModal.query.country;
    const numGuests = searchModal.query.guests;
    const numBathrooms = searchModal.query.bathrooms;
    const numBedrooms = searchModal.query.bedrooms;
    const checkIn = searchModal.query.checkIn;
    const checkOut = searchModal.query.checkOut;
    const category = searchModal.query.category;




    //lets create a list of the properties and usestate to get property type
    const [properties, setProperties] = useState<PropertyType[]>([]);

    // create a function for markfavorite
    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpProperties = properties.map((property: PropertyType) => {
            if (property.id == id){
                property.is_favorite = is_favorite

                if (is_favorite){
                    console.log("added to list of favorited properties")

                }else{
                    console.log('removed from list....')
                }
            }  
            return property 
        })
        setProperties(tmpProperties)
    }

    // sEARCH METHODS function
    // we can parse the landlord_id to the url
    //to check the user checking checkout and the things which the property have
    //also we will remove the first letter & if not we cant read it from the backend
    const getProperties = async () =>{
        //get our url from service.apiServicethe backend and get a specific landlord_id or user_id
        let url = '/api/properties/'

        if (landlord_id) {
            url += `?landlord_id=${landlord_id}` 
        }else if(favorites) {
                url +='?is_favorites=true'
        }else {
            let urlQuery = '';
            if (country) {
                urlQuery += '&country' + country
            }

            if (numGuests) {
                urlQuery += '&guests' + numGuests
            }

            if (numBathrooms) {
                urlQuery += '&bathrooms' + numBathrooms
            }

            if (numBedrooms) {
                urlQuery += '&bedrooms' + numBedrooms
            }

            if (category) {
                urlQuery += '&category' + category
            }

            if (checkIn) {
                urlQuery += '&checkin' + format(checkIn, 'yyyy-MM-dd')
            }

            if (checkOut) {
                urlQuery += '&checkout' + format(checkOut, 'yyyy-MM-dd')
            }

            if (urlQuery.length) {
                console.log('Query:', urlQuery)
                // this will remove the amber sign & so we can read the message from the backend
                urlQuery = '?' + urlQuery.substring(1)
                // we append the url query t the url we have up there
                //after the query add category to getProperty useeffect
                url += urlQuery 
            }
           
        }


        const tmpProperty = await apiService.get(url)
        setProperties(tmpProperty.data)
    };
    //this is a function we will create a asyncronize function above
    //this will load only when the page is loaded
    useEffect(() => {
        getProperties();
    }, [category, searchModal.query, params]);

    return(
        <>
        {/* Lets loop throw the properties  */}
            {properties.map((property) =>{

                return(
                    <PropertyListItem 
                        key={property.id}
                        property={property}
                        markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    )
}
export default PropertyList