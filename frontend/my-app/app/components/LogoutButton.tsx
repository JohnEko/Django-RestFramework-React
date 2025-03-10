'use client'

import { useRouter } from "next/navigation"
import {resetAuthCookies} from "@/app/lib/actions"
import MenuLink from "./Navbar/MenuLink"
import React from "react"

const LogoutButton: React.FC = () =>{

    const router = useRouter();
//help us to submit it to the backend
    const submitLogout = async () =>{

        resetAuthCookies();

        router.push('/')
    }

    return(
        <MenuLink
            label="Log out"
            onClick={submitLogout} />
    )
}
export default LogoutButton
