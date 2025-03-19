import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import AboutUs from '@/pages/About/AboutUs';
import Leadership from '@/pages/About/Leadership';
import ContactUs from '@/pages/About/ContactUs';
import FAQs from '@/pages/About/FAQs';
import TrySugar from '@/pages/TrySugar';
import JoinDevelopment from '@/pages/JoinDevelopment';
import Volunteer from '@/pages/Volunteer';
import Donate from '@/pages/Donate';
import Products from '@/pages/Products';
import NewsPage from '@/pages/News/NewsPage';
import NewsDetailPage from '@/pages/News/NewsDetailPage';

const router = createBrowserRouter([
  { path: `/`, element: <MainPage /> },
  { path: `/about-us`, element: <AboutUs /> },
  { path: `/leadership`, element: <Leadership /> },
  { path: `/contact-us`, element: <ContactUs /> },
  { path: `/faqs`, element: <FAQs /> },
  { path: `/news`, element: <NewsPage /> },
  { path: `/news/:category`, element: <NewsPage /> },
  { path: `/news/:category/:slug`, element: <NewsDetailPage /> },
  { path: `/try-sugar`, element: <TrySugar /> },
  { path: `/join-development`, element: <JoinDevelopment /> },
  { path: `/volunteer`, element: <Volunteer /> },
  { path: `/donate`, element: <Donate /> },
  { path: `/products`, element: <Products /> },
]);

export default router;
