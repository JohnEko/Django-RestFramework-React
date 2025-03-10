'use client'

import Modal from "./Modals"
import { useState } from "react"
import { useRouter } from "next/navigation"
import UseSignUpModal from "@/app/hooks/UseSignUpModal"
import CustomeButton from "../forms/CustomeButton"
import { error } from "console"
import apiService from "@/app/services/apiService"
import { unique } from "next/dist/build/utils"
import { handleLogin } from "@/app/lib/actions"

const SignUpModal =()=>{
    //variable
    const router = useRouter()
    const signUpModal = UseSignUpModal()
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    //Submit functionality
    const submitSignUp = async () =>{
        //we get the data from backend
        const forData = {
            email:email,
            password1:password1,
            password2:password2
        }
        const response = await apiService.post('/api/auth/register/', JSON.stringify(forData));

        if (response.access) {
            handleLogin(response.user.pk, response.access, response.refresh);


            signUpModal.close()
            router.push('/')
        }else{
            //this will generate arrays of errors base on what we get from the server
            const tmpError: string[] = Object.values(response).map((error: any) => {
                return error
            })
            setErrors(tmpError);
        }

    }

    const content =(
        <>
        <h2 className="mb-6 text-2x">Welcome and login</h2>
{/* giving the space between email and password box */}
{/* Lets create a signup so when the user click the submit button he will signed up */}
        <form 
            action={submitSignUp}
            className="space-y-4">           
            <input onChange={(e) => setEmail(e.target.value)} type="text"  placeholder="Enter your email address" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
           
            <input onChange={(e) => setPassword1(e.target.value)} type="password"  placeholder="Enter your password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>
            <input onChange={(e) => setPassword2(e.target.value)} type="password"  placeholder="Confirm password" className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"/>

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
                onClick={submitSignUp}
                
            />
        
        
        </form>
        

        </> 
    )
    return(
        <Modal 
            isOpen={signUpModal.isOpen}
            close={signUpModal.close}
            label="Sign Up"
            content={content}
        />
    )
}
export default SignUpModal