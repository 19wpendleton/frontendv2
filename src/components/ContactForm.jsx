import { useRef, useState } from "react";
import { useContactFormContext } from "../hooks/useContactFormContext";
import emailjs from '@emailjs/browser'

const ContactForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [questions, setQuestions] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        // Check for empty fields
        const fields = {
            name: name.trim(),
            email: email.trim(),
            questions: questions.trim()
        };

        const emptyFields = Object.keys(fields).filter(key => fields[key] === '');

        if (emptyFields.length > 0) {
            setEmptyFields(emptyFields);
            setError("Please fill in all fields")
            return; // Stop the function if there are empty fields
        }

        emailjs.sendForm('service_ho70w9r', 'template_m44o5lo', form.current, '8dknuNbxM_Jk49Nad')
            .then((res) => {
                console.log(res.text);
                setName('')
                setEmail('')
                setQuestions('')
                setError(null)
                setEmptyFields([])
                console.log('New contact form added')
                alert('Message sent successfully!')
            }, (error) => {
                console.log(error.text);
            });
    }

    
    return (
        <form ref={form} className="create" onSubmit={sendEmail}>
            <h3>Contact Form</h3>
            
            <label>Name:</label>
            <input 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={ name }
            className={emptyFields.includes('name') ? 'error' : ''}
            name="name"
            />
            
            <label>Email:</label>
            <input 
            type="text" 
            onChange={(e) => setEmail(e.target.value)}
            value={ email }
            className={emptyFields.includes('email') ? 'error' : ''}
            name="email"
            />

            <label>Questions:</label>
            <textarea 
            onChange={(e) => setQuestions(e.target.value)}
            value={ questions }
            className={emptyFields.includes('questions') ? 'error' : ''}
            name="questions"
            />

            <button>SEND</button>
            {error && <div className="error">{ error }</div>}
        </form>
    )
}

export default ContactForm