'use client'

import React from "react"

interface MenuLink{
    label:string
    onClick: ()=> void
}

const MenuLink: React.FC<MenuLink> =({
    label,
    onClick
}) =>{
    return(
        
        <div 
        onClick={onClick}
        className="px-5 py-4 cursor-pointer hover:bg-gray-100 transition">
            {label}
        </div>
    )
}
export default MenuLink