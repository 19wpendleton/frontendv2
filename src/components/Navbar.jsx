import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <div className="logo-container">
                        <img src="/img/telescope.svg" alt="telescope" width={80}/>
                        <h1>codeSpace</h1>
                    </div>
                </Link>
                <Link to="/">
                    <h3>Home</h3>
                </Link>
                <Link to="/about">
                    <h3>About</h3>
                </Link>
                <Link to="/contact">
                    <h3>Contact</h3>
                </Link>
                <Link to="/work">
                    <h3>Work</h3>
                </Link>
            </div>
        </header>
    )
}

export default Navbar