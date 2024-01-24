import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Work from './pages/Work';
import {Helmet} from 'react-helmet';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Helmet>
        <title>William Pendleton</title>
      </Helmet>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
            path="/"
            element={<Home />}
            />
            <Route
            path="/about"
            element={<About />}
            />
            <Route
            path="/contact"
            element={<Contact />}
            />
            <Route
            path="/work"
            element={<Work />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
