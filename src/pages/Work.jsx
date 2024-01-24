import Breakout from "../components/Breakout"
import Crypto from "../components/Crypto"
import Kenzli from "../components/Kenzli"
import Memory from "../components/Memory"
import Footer from "../components/Footer"
const Work = () => {
    
    return (
        <div className="work">
            <h1>Here is my work</h1>
           <div>
            <Kenzli />
            <Memory />
            <Crypto />
            <Breakout/>
           </div>
           <Footer />
        </div>
    )
}

export default Work