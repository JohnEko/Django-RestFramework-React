"use client"

import { Label } from "@radix-ui/react-dropdown-menu"
import CustomeButton from "../forms/CustomButton"
import { ConversationType } from "@/app/inbox/page"
import React, { useEffect, useState, useRef } from "react";
import useWebSocket, {ReadyState} from "react-use-websocket"
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";

interface ConversationDetailProps {
    userId: string;
    token: string;
    conversation: ConversationType;
    messages: MessageType[];
}

const ConversationDetail: React.FC<ConversationDetailProps> =({
    userId,
    token,
    conversation,
    messages
})=>{
//    To keep tract of our message we need to setmessage
    const messagesDiv = useRef(null)
    const [newMessage, setNewMessage] = useState('')
    const myUser = conversation.users?.find((user) => user.id == userId)
    const otherUser = conversation.users?.find((user) => user.id != userId)
    const [realTimeMessages, setRealTimeMessages] = useState<MessageType[]>([])
    


    // Lets connect to the websockets
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(`ws:127.0.0.1:8000/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true,

      },
    )

    // we can call our connection or connect with useeffect to the frontend
    useEffect(() => {
        console.log("Connection state changed", readyState)
    }, [readyState]);

    // to get the message from the user use can use useEffects
    //everytime we received a message we scroll to the bottom of the conversation
    console.log("SendMessage")
    useEffect(() =>{
            // lets check the message type with if statement
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            const message: MessageType ={
                id: '',
                name: lastJsonMessage.name as string,
                body: lastJsonMessage.body as string,
                sent_to: otherUser as UserType,
                created_by: myUser as UserType,
                conversationId: conversation.id
            }
           
            //seting the real time messages and unpacking everything to the message
            setRealTimeMessages((realTimeMessages) => [...realTimeMessages, message])
        }
        scrollToBottom();
    }, [lastJsonMessage]);

    const sendMessage = async () => {
        console.log("SendMessage"),
        sendJsonMessage({
            event : 'chat_message',
            data: {
                body: newMessage,
                name: myUser?.name,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id
            }

           
        });
        // After the message is send we set new message to emty string so the message box is cleared
        setNewMessage('');

        // lets set scrolling to buttom or top is not message or current message
        setTimeout(() => {
            scrollToBottom()
        }, 50);
    }
    const scrollToBottom = () =>{
        if (messagesDiv.current) {
            messagesDiv.current.scrollTop = messagesDiv.current.scrollheight;
        }
    }

    return(
        // Here is where we like to have our messages 
        // parse the messagesDiv to the main div it will help to scroll to the buttom each time new message is sent
        <>
            <div 
                ref={messagesDiv}
                className="max-h-[400px] overflow-auto flex flex-col space-y-4">
                        {/* get the right margin for the user message sent either gray or blue */}
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`w-[80%] py-4 px-6 rounded-xl ${message.name === myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}` }
                        >
                            {/* //print the name of the user also make the message blue */}
                            <p className="font-bold text-gray-500">{message.name}</p>
                            <p>{message.body}</p>
                        </div>
                    ))}
            </div>

                {/* create a form to send the message */}
            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input 
                    type="text"
                    placeholder="Type your message"
                    className="w-full p-2 bg-gray-200 rounded-xl"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                {/* we want the button to be reusable 
                the onclick function make when the user click the button from the form
                this is a server component we need to let the server know its a cllient component*/}
                <CustomeButton 
                label='Send'
                onClick={sendMessage}
                className="w-[100px]"
                />
                
            </div>
        </>
        
    )
}
export default ConversationDetail