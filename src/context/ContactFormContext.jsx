import { createContext, useReducer } from "react"

export const ContactFormContext = createContext()

export const contactFormReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CONTACT_FORMS':
            return {
                contactForms: action.payload,
            }
        case 'CREATE_CONTACT_FORM':
            return {
                contactForms: [action.payload, ...state.contactForms],
            }
        default:
            return state;
    }
}

export const ContactFormContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(contactFormReducer, {
        contactForms: [],
    })

    return (
        <ContactFormContext.Provider value={{...state, dispatch}}>
            { children }
        </ContactFormContext.Provider>
    )
}