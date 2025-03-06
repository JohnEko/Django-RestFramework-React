'use client'
import { useCallback, useEffect, useState } from "react"

interface ModalProps{
    label:string
    close: () => void
    content:React.ReactElement
    isOpen: boolean

}


const Modal: React.FC<ModalProps> =({
    label,
    content,
    isOpen,
    close
})=>{
    // This can be for test and we can import the modal in Layout={.css}
    //if you need to set a variables you need to use curle brace on div class
    //it appears on all page pass it isopen value specify it on the layout page
    //we can add a traslate to showModal? if its true
    //${showModal ? 'translate-y-0' : 'translate-y-full'} it helps push all the way below the screen
    const [showModal, setShowModal] = useState(isOpen)
    useEffect(() => {
        setShowModal(isOpen)
        // IF THIS VALUE CHANGES FROM TRUE TO FALSE OR FALSE TO TRUE IT WILL SET MODEL SHOW TO ISOPEN
    }, [isOpen])
// when this is click it will call this function 
    const handleClose = useCallback(() => {
        setShowModal(isOpen)
        setTimeout(() => {
            close();
        }, 300)
    }, [close])

    if (!isOpen){
        return null;
    }
    return(
            <div className="flex items-center justify-center fixed inset-0 z-50 bg-black/60">
                <div className="relative w-[90%] md:w-[80%] lg:w-[700px] my-6 mx-auto h-auto">
                    <div className={`translate duration-600 h-full ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-10'}`}>
                        <div className="w-full h-auto rounded-xl relative flex flex-col bg-white">
                            <header className="h-[60px] flex items-center p-6 rounded-t justify-center relative border b">
                                
                                <div 
                                onClick={handleClose}
                                className="p-3 absolute left-3 hover:bg-gray-300 rounded-full cursor-pointer">
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                                </div>
                                {/* lets make it dynamic to possible to use label */}
                                <h2 className="text-lg font-bold">{label}</h2>

                            </header>
                            <section className="p-6">
                                {/* The content allow us to pass html elements on our page */}
                                {content}
                            </section>

                        </div>

                    </div>

                </div>
        
            </div>
    )
}
export default Modal