import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Home from './Home';
import Events from './Events';
import ExeCom from './ExeCom';
import History from './History';
import Contact from './Contact';
import ScrollProgress from '../components/ScrollProgress';
import BackToTop from '../components/BackToTop';

export default function MainPage() {
  const location = useLocation();

  // Handle scrolling when navigating to a hash directly via URL or external link
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
      <ScrollProgress />
      <BackToTop />
      
      <div id="home">
        <Home />
      </div>
      
      <div id="events">
        <Events />
      </div>
      
      <div id="execom">
        <ExeCom />
      </div>
      
      <div id="history">
        <History />
      </div>
      
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}
