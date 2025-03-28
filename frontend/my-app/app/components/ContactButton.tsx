'use client';

import UserLoginModal from "../hooks/useLoginModal";
import { useRouter } from "next/navigation";
import apiService from "../services/apiService";

interface ContactButtonProps {
    userId: string | null;
    landlordId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
    userId,
    landlordId
}) =>{

    const loginModal = UserLoginModal()
    const router = useRouter()

    const startConversation = async () => {
        if (userId) {
            const conversation = await apiService.get(`/api/start/${landlordId}/`)

            if (conversation.conversation_id){
                router.push(`/inbox/${conversation.conversation_id}`)
            }
        }else {
            loginModal.open()
        }
    }

    // WANT TO CALL THIS MODAL WHEN I CLICK THIS 
    return(
        <div 
            onClick={startConversation}
            className="mt-6 py-4 px-6 cursor-pointer bg-red-500 font-bold text-black hover:bg-airbnb-dark rounded-xl transition">
            Contact
        </div>
        
    )
}
export default ContactButton