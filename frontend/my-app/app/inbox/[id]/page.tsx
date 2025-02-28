import ConversationDetail from "@/app/components/inbox/ConversationDetail"



const ConversationPage = () =>{
    // can create a table row inside this box with different links or href tag
    // for smaller and lager devices  grid grid-col-1 md:grid-cols-4 gap-4
        return(
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <ConversationDetail />
           
            </main>
        )


}
export default ConversationPage