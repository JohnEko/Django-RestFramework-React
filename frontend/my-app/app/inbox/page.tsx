
import { getUserId } from "../lib/actions";
//import React, { useState, useEffect } from "react";
import apiService from "../services/apiService";

import Conversation from "../components/inbox/Conversation";

// we get one type for users and one for conversation
export type UserType = {
    id: string;
    name: string;
    avatar_url: string;
}

export type ConversationType = {
    id: string;
    users: UserType[];

}


const InboxPage = async () =>{

    const userId = await getUserId()

    if (!userId) {
        return(
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }
    // lets connect to our backend
    const conversations = await apiService.get('/api/properties/conversation/')

 
// can create a table row inside this box with different links or href tag
// for smaller and lager devices  grid grid-col-1 md:grid-cols-4 gap-4
    return(
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-3">
            <h1 className="my-6 text-2xl">inbox</h1>
            {/* we can lop through our conversation */}
            {conversations && conversations.map && conversations.map((conversation: ConversationType) => {
                return(
                    // we will fixed the error from the UserId that says does not exist on type 'IntrinsicAttributes 
                    <Conversation 
                        userId={userId}
                        key={conversation.id}
                        conversation={conversation}
                    />
                )
            } )}
            
            
        </main>

    )
}
export default InboxPage





   