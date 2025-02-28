import Conversation from "../components/inbox/Conversation"


const InboxPage = () =>{
// can create a table row inside this box with different links or href tag
// for smaller and lager devices  grid grid-col-1 md:grid-cols-4 gap-4
    return(
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-3">
           
            <h1 className="my-6 text-2xl">inbox</h1>
            <Conversation />
            <Conversation />
            <Conversation />
            
        </main>

    )
}
export default InboxPage