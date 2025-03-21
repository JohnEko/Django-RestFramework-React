'use client'

import Modal from "./Modals"
import { useState } from "react"
import { useRouter } from "next/navigation"
import UserLoginModal from "@/app/hooks/useLoginModal"
import CustomeButton from "../forms/CustomButton"

import { handleLogin } from "@/app/lib/actions"
import apiService from "@/app/services/apiService"

const LoginModal =()=>{
    const router = useRouter()
    const loginModal = UserLoginModal()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<string[]>([])


    //lets create submit login button form
    const submitLogin = async () =>{
        const formData ={
            email: email,
            password: password
        }

        const response = await apiService.postWithoutToken('/api/auth/login/', JSON.stringify(formData))
        
        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh);


            loginModal.close()
            router.push('/')
        }else{
            setErrors(response.non_field_errors);
        }

    }

    const content =(
        <>
        <h2 className="mb-6 text-2x">Welcome and login</h2>
{/* giving the space between email and password box */}
        <form 
            action={submitLogin}
            className="space-y-4">
            <input onChange={(e) => setEmail(e.target.value)} type="text"  placeholder="Enter your email address" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
           
            <input onChange={(e) => setPassword(e.target.value)} type="password"  placeholder="Enter your password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
            
            {/* we create a div if there is error */}
           {/* we set errors if we enconter any error while user login */}
           {errors.map((error, index) =>{
                return(
                        /* we create a div if there is error */
                        <div 
                        key={`error_${index}`}
                        className="p-5 bg-red-400 test-white rounded-xl opacity-80">
                        {error}
                        </div>
                )
            })} 
            {/* use button we created ealier */}
            <CustomeButton 
                label={"Submit"} 
                onClick={submitLogin}
                
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