'use client';

import Image from "next/image";
import { useEffect, useState } from "react"
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
}

const PropertyList = () =>{
    //lets create a list of the properties and usestate to get property type
    const [properties, setProperties] = useState<PropertyType[]>([]);
    // this will be asyn function
    const getProperties = async () =>{
        //get our url from service.apiServicethe backend
        const tmpProperty = await apiService.get('/api/properties/')
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
                    />
                )
            })}
        </>
    )
}
export default PropertyList