
import apiService from "@/app/services/apiService"
import ConversationDetail from "@/app/components/inbox/ConversationDetail"
import { getUserId } from "@/app/lib/actions"
import React, {useState, useEffect } from "react"
import { UserType } from "../page"

export type MessageType = {
    id: string,
    name: string,
    body: string,
    conversation: string,
    sent_to: UserType,
    created_by: UserType
}

// convert this to get the id from the url using params
const ConversationPage = async ({params}: {params: {id: string}}) =>{

    const userId = await getUserId()
    
        if (!userId) {
            return(
                <main className="max-w-[1500px] max-auto px-6 py-12">
                    <p>You need to be authenticated...</p>
                </main>
            )
        }
        // lets parse the api conversation
        const conversation = await apiService.get(`api/properties/conversation/${params}/`)
    // can create a table row inside this box with different links or href tag
    // for smaller and lager devices  grid grid-col-1 md:grid-cols-4 gap-4
        return(
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <ConversationDetail 
                    conversation={conversation}
                />
           
            </main>
        )


}
export default ConversationPage