import { useEffect } from "react"
import { useContactFormContext } from "../hooks/useContactFormContext"
import ContactForm from "../components/ContactForm"

// setting workouts, which i dont need for my app
const Contact = () => {

    return (
        <><div className="contact-me">
            <h3>Contact me here</h3>
            <p>Thanks for stopping by! If you have any questions or need to contact me, please fill out the form</p>
        </div>
        <div>
                <ContactForm />
            </div>
            <div>
            </div>
            </>
    )
}

export default Contact