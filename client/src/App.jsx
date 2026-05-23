import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Import Pages
import MainPage from './pages/MainPage';
import Authentication from './pages/Authentication';
import Awards from './pages/Awards';
import Society from './pages/Society';
import Dashboard from './pages/Dashboard';



function App() {
  return (
    <GoogleOAuthProvider clientId="943025446799-vcr2knd0p3j7orjrvmn5ko00rp50uv8i.apps.googleusercontent.com">
      <Router>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar /> 
          <main style={{ flex: 1 }}>
            <Routes>
              {/* The new consolidated Single Page Application view */}
              <Route path="/" element={<MainPage />} />
              
              {/* Separate Routes */}
              <Route path="/auth" element={<Authentication />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/society/:societyId" element={<Society />} />
            </Routes>
          </main>
          <Footer />
        </div> 
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;