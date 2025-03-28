"use client"

import { Label } from "@radix-ui/react-dropdown-menu"
import CustomeButton from "../forms/CustomButton"
import { ConversationType } from "@/app/inbox/page"
import React, { useEffect } from "react";
import useWebSocket, {ReadyState} from "react-use-websocket"

interface ConversationDetailProps {
    userId: string;
    token: string;
    conversation: ConversationType;
}

const ConversationDetail: React.FC<ConversationDetailProps> =({
    userId,
    token,
    conversation
})=>{
    const myUser = conversation.users?.find((user) => user.id == userId)
    const otherUser = conversation.users?.find((user) => user.id != userId)
    //const url = '127.0.0.1:8000/api/properties/'

    // Lets connect to the websockets
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(`ws:127.0.0.1:8000/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true,

      },
    )
    // we can call our connection or connect with useeffect to the frontend
    useEffect(() => {
        console.log("Connection state changed", readyState)
    }, [readyState])


    return(
        // Here is where we like to have our messages
        <>
            <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
                <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200">
                    {/* show the person who sent the message */}
                    <p className="font-bold text-gray-500">Timi John</p>

                    <p className=""> kfjjgfkgfkf</p>
                </div>

                <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
                    {/* show the person who sent the message */}
                    <p className="font-bold text-gray-500">Timi John</p>

                    <p className=""> kfjjgfkgfkf</p>
                </div>


            </div>

                {/* create a form to send the message */}
            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input 
                    type="text"
                    placeholder="Type your message"
                    className="w-full p-2 bg-gray-200 rounded-xl"
                />
                {/* we want the button to be reusable 
                the onclick function make when the user click the button from the form
                this is a server component we need to let the server know its a cllient component*/}
                <CustomeButton 
                label={"Send"}
                onClick={() => console.log('Clicked')}
                className="w-[100px]"
                />
                
            </div>
        </>
        
    )
}
export default ConversationDetail