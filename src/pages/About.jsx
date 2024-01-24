import {Link} from 'react-router-dom';
import Footer from '../components/Footer';
const About = () => {
    
    return (
        <>
        <div className="about-title">
            <h1>Welcome!</h1>
            <p>Hello! I'm Will, a passionate and creative web developer dedicated to creating dynamic and user-friendly websites. With a strong foundation in front-end and back-end technologies, I bring your ideas to life.</p>
            
            <h3>Who am I?</h3>
            <p>I'm a problem solver and a digital architect. My journey in web development started with a fascination for creating amazing applications and websites. I've honed my skills in HTML, CSS, JavaScript, and various frameworks such as Express, React, and Node.js to build robust and responsive web applications.</p>

            <h3>What I Do</h3>
            <p>My expertise lies in translating concepts into clean and efficient websites. From dynamic user interfaces to seamless user experiences, I love creating websites that provide users with a good experience.</p>

            <h3>Let's Collaborate</h3>
            <p>I believe in the power of collaboration. Whether you're a business owner looking to establish an online presence or a fellow developer seeking a creative partner, let's join forces. Together, we can turn ideas into reality and create digital experiences that resonate with your audience.</p>

            <h3>Get in Touch</h3>
            <p>Let's connect and discuss how we can bring your vision to life. Visit my <Link to='/contact'>Contact</Link> page for more information.</p>

            <p>Thank you for considering me as your web developer. I look forward to the opportunity of working together!</p>

            <p>Sincerely,</p>

            <p>Will</p>
            <p>Web Developer</p>
            <div className="contact-button">
                <Link to='/contact'>
                    <button>Contact Me</button>
                </Link>
            </div>
            <Footer />

        </div>
        <div className='about-img'>
            <img src="/img/william_pendleton.jpg" alt="will-pendleton" />
            <caption>snipitsbykenzli.com</caption>
        </div>
        </>
    )
}

export default About