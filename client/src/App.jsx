import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Import Pages
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import Events from './pages/Events';
import ExeCom from './pages/ExeCom';
import Awards from './pages/Awards';
import Society from './pages/Society';
import History from './pages/History';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <GoogleOAuthProvider clientId="943025446799-vcr2knd0p3j7orjrvmn5ko00rp50uv8i.apps.googleusercontent.com">
      <Router>
        {/* THE FIX: Put the invisible listener here! */}
        <ScrollToTop />
        {/* This wrapper forces the footer to the bottom if the page content is short */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
        <Navbar /> 
        
        {/* The Routes control which page renders based on the URL */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/execom" element={<ExeCom />} />
            <Route path="/awards" element={<Awards />} />
            
            {/* We use a dynamic parameter (:id) so one Society page can handle multiple different societies */}
            <Route path="/society/:societyId" element={<Society />} />
            
            <Route path="/history" element={<History />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
        </div> 
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;