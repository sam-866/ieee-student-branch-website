import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  // Grab the current URL path
  const { pathname } = useLocation();

  // Every time the pathname changes, run this effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component is completely invisible!
  return null;
}