'use client';
import React, { useState } from "react";
import UserLoginModal from "@/app/hooks/useLoginModal";
import UseSignUpModal from "@/app/hooks/UseSignUpModal";
import LogoutButton from "../LogoutButton";
// import { Button } from "@/components/ui/button";
// import { Menu } from "lucide-react";
// import Image from "next/image";

import MenuLink from "./MenuLink";

interface UserNavProps {
    userId?: string | null;
}
// let the function no this is coming from react
const UserNav: React.FC<UserNavProps> = ({
//parse in the userid so we can use it below
    userId
}) => {
    const loginModal = UserLoginModal()
    const signUpModal = UseSignUpModal()
    // using this function for our dropdown
    const [isOpen, setIsOpen] = useState(false)
    // working with the user navigation bar
    //the navigation bar left
    // onclick if a user click the navigation bar they see what is in
    return(
        <div className="p-2 relative inline-block border">
            <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex item-center">
            {/* get below code from heroicons */}
            <svg  fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>

            </button>

            {(isOpen &&
            // make the button below each other flex flex-col
                <div className="w-[220px] absolute top-[60px] right-0 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer">
                      {/* lets check is user is login so they cannot see the signin and login button  */}
                      {userId ?(

                        <LogoutButton />
                      ) : (
                      
                      <>   
                            <MenuLink
                                label='Log in'
                                onClick={() =>{
                                    setIsOpen(false)
                                    loginModal.open()
                                }}
                            />

                                <MenuLink
                                label='Sign up'
                                onClick={() =>{
                                    setIsOpen(false)
                                    signUpModal.open()
                                }}
                            />
                        </>
                    )}
                </div>
            )}
            
        </div>
    )
}
export default UserNav