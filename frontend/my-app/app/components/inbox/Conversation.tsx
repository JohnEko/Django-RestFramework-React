'use client';

import { useRouter } from "next/navigation";
import { ConversationType } from "@/app/inbox/page";
import React from "react";
import { Router } from "lucide-react";

interface ConversationProps {
    conversation: ConversationType;
    userId: string;
}

const Conversation: React.FC<ConversationProps> = ({
    conversation,
    userId
})=> {

    const ruoter = useRouter()
    // now check which user we talking with
    const otherUser = conversation.users.find((user) => user.id != userId)

    return(
        // This will make you see the user you having conversation with
        <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
            {/* show the name of person you talking to */}
            <p className="mb-6 text-xl">{otherUser?.name}</p>

            <p 
                onClick={() => ruoter.push(`/inbox/${conversation.id}`)}
                className="text-red-400 font-bold"
            >
                Go to conversation</p>

        </div>
    )
}

export default Conversation