'use client';

import Image from "next/image";
import React, { useEffect, useState } from "react"
import PropertyListItem from "./PropertyListItem"
import apiService from "@/app/services/apiService";

import { URL } from "url";
import { resolve } from "path";
import { json } from "stream/consumers";


export type PropertyType ={
    id:string;
    title: string;
    category:string
    image:string
    is_favorite: boolean
}

interface PropertyListProps {
    landlord_id?: string | null
}

const PropertyList: React.FC<PropertyListProps> = ({
    landlord_id
}) =>{
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

    // this will be asyn function
    // we can parse the landlord_id to the url
    const getProperties = async () =>{
        //get our url from service.apiServicethe backend and get a specific landlord_id or user_id
        let url = '/api/properties/'

        if (landlord_id) {
            url += `?landlord_id=${landlord_id}` 
        }
        const tmpProperty = await apiService.get(url)
        setProperties(tmpProperty.data)
    };
    //this is a function we will create a asyncronize function above
    //this will load only when the page is loaded
    useEffect(() => {
        getProperties();
    }, []);

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