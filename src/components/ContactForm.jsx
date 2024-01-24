import { useState } from "react";
import { useContactFormContext } from "../hooks/useContactFormContext";
import axios from 'axios';

const ContactForm = () => {
    const { dispatch } = useContactFormContext()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [questions, setQuestions] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const contactForm = {name, email, subject, questions}

        const response = await fetch('/api/contactForm', {
            method: 'POST',
            body: JSON.stringify(contactForm),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setEmail('')
            setSubject('')
            setQuestions('')
            setError(null)
            setEmptyFields([])
            console.log('New contact form added')
            dispatch({type: 'CREATE_CONTACT_FORM', payload: json})
        }
    
        console.log('Sending request', { email, subject, questions, name })
    
        if(email && subject && questions && name) {
            axios
                .post('https://backend-jazg.onrender.com/send_email', {
                    name,
                    email,
                    subject,
                    questions
                })
                .then(() => {
                    alert('Message sent successfully')
                })
                .catch(() => alert('Whoops'))
            return;
        }
            return alert("Fill in all fields to continue")
        }
    
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Contact Form</h3>
            
            <label>Name:</label>
            <input 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={ name }
            className={emptyFields.includes('name') ? 'error' : ''}
            />
            
            <label>Email:</label>
            <input 
            type="text" 
            onChange={(e) => setEmail(e.target.value)}
            value={ email }
            className={emptyFields.includes('email') ? 'error' : ''}
            />

            <label>Subject:</label>
            <textarea 
            onChange={(e) => setSubject(e.target.value)}
            value={ subject }
            className={emptyFields.includes('subject') ? 'error' : ''}
            />

            <label>Questions:</label>
            <textarea 
            onChange={(e) => setQuestions(e.target.value)}
            value={ questions }
            className={emptyFields.includes('questions') ? 'error' : ''}
            />

            <button>SEND</button>
            {error && <div className="error">{ error }</div>}
        </form>
    )
}

export default ContactForm