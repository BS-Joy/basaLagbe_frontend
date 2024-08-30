import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layouts/Layout"
import Home from "./components/pages/home/Home"
import AdsPage from "./components/pages/ads/AdsPage"
import ContactPage from "./components/pages/contact/ContactPage"
import SignUp from "./components/pages/user/SignUp"
import LogIn from "./components/pages/user/LogIn"
import PostAds from "./components/pages/ads/PostAds"
import AdsDetail from "./components/pages/ads/AdsDetail"
import Profile from "./components/pages/user/Profile"
import PublicRoute from "./components/routes/PublicRoute"
import PrivateRoute from "./components/routes/PrivateRoute"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/signup',
          element: <PublicRoute><SignUp /></PublicRoute>
        },
        {
          path: '/login',
          element: <PublicRoute><LogIn /></PublicRoute>
        },
        {
          path: '/ads',
          element: <AdsPage/>
        },
        {
          path: '/details/:id',
          element: <AdsDetail />,
        },
        {
          path: '/postAds',
          element: <PrivateRoute><PostAds/></PrivateRoute>
        },
        {
          path: '/contact',
          element: <ContactPage/>
        },
        {
          path: '/profile',
          element: <PrivateRoute><Profile/></PrivateRoute>
        },
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} ></RouterProvider>
    </>
  )
}

export default App
