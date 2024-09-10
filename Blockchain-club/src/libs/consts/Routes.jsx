import AboutPage from "../../components/Pages/AboutPage";
import ContactPage from "../../components/Pages/ContactPage";
import EventPage from "../../components/Pages/EventPage";
import HomePage from "../../components/Pages/HomePage";
import TeamPage from "../../components/Pages/TeamPage";

export const HOME_NAVIGATION_LINKS =[
    {
        key: 'home',
        path: '/',
        element: <HomePage/>,
    },
    {
        key: 'about',
        path: '/about',
        element: <AboutPage/>,
    },
    {
        key: 'events',
        path: '/events',
        element: <EventPage/>,
    },
    {
        key: 'team',
        path: '/team',
        element: <TeamPage/>,
    },
    {
        key: 'involve',
        path: '/involve',
        element: <ContactPage/>,
    },
]
