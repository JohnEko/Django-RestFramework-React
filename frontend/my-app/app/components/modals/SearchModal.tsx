'use client'

import Modal from "./Modals"
import useSearchLoginModal from "@/app/hooks/useSearchModal"
import SelectCountry, {SelectCountryValue} from "../forms/SelectCountry" 
import { useState } from "react"

const SearchModal = () => {

    let content = (<></>);
    const searchModal = useSearchLoginModal();

    const [country, setCountry] = useState<SelectCountryValue>();

    return(
        <Modal 
            isOpen = {searchModal.isOpen}
            close={searchModal.close}
            label="Search"
            content={content}
        />
    )

}
export default SearchModal