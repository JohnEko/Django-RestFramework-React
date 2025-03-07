'use client';

import { useEffect, useState } from "react"
import PropertyListItem from "./PropertyListItem"
import { URL } from "url";


export type PropertyType ={
    id:string;
    title: string;
    category:string
}

const PropertyList = () =>{
    //lets create a list of the properties and usestate to get property type
    const [peoperties, setProperties] = useState<PropertyType[]>([]);
    // this will be asyn function
    const getProperties = async () =>{
        //get our url from the backend
        const url = 'http://localhost:8000/api/properties';
        await fetch(url, {
            method:'GET',
            
        })
            .then(response => response.json())
           
            .then((json) => {
                console.log('json', json);

                setProperties(json.data)
            })
            .catch((error) => {
                console.log('error', error);
            });

    };

    //this is a function we will create a asyncronize function above
    useEffect(() => {
        getProperties();
    }, []);

    return(
        <>
        {/* Lets loop throw the properties  */}
            {peoperties.map((property) =>{

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