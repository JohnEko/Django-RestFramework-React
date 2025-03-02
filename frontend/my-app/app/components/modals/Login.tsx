'use client'

import Modal from "./Modals"
import { useState } from "react"
import UserLoginModal from "@/app/hooks/useLoginModal"
import CustomeButton from "../forms/CustomeButton"

const LoginModal =()=>{

    const loginModal = UserLoginModal()

    const content =(
        <>
        <h2 className="mb-6 text-2x">Welcome and login</h2>
{/* giving the space between email and password box */}
        <form className="space-y-4">
            <input type="text"  placeholder="Enter your email address" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
           
            <input type="password"  placeholder="Enter your password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
            
            {/* we create a div if there is error */}
            <div className="p-5 bg-red-400 test-white rounded-xl opacity-80">
                Error message
            </div>
            {/* use button we created ealier */}
            <CustomeButton 
                label={"Submit"} 
                onClick={() => console.log('Test')}
                
            />
        
        
        </form>
        

        </> 
    )
    return(
        <Modal 
            isOpen={loginModal.isOpen}
            close={loginModal.close}
            label="Login"
            content={content}
        />
    )
}
export default LoginModal