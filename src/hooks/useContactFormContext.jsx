import { ContactFormContext } from "../context/ContactFormContext";
import { useContext } from "react";

export const useContactFormContext = () => {
    const context = useContext(ContactFormContext)

    if (!context) {
        throw Error('useContactFormContext must be used in a ContactFormContextProvider')
    }

    return context
}