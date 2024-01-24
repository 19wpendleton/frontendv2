import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-container">
                    <Link to="https://www.instagram.com/williamm_pen/">
                        <img src="/img/instagram-2-1-logo-svgrepo-com.svg" alt="instagram" />
                    </Link>
                    <Link to="https://www.facebook.com/WilliamMarkPendleton/">
                        <img src="/img/facebook-color-svgrepo-com.svg" alt="facebook" />
                    </Link>
                    <Link to="https://github.com/19wpendleton">
                        <img src="/img/github-142-svgrepo-com.svg" alt="github" />
                    </Link>
                </div>
            </footer>
        </>
    )
}

export default Footer;