import './App.css';
import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'
import Register from "./Components/Register"
import Home from "./Components/Home"
import Login from "./Components/Login"
import Error from "./Components/Error"
import HackathonRegistration from "./Components/HackathonRegistration"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Home />
        </>
      ),
    },

    {
      path: '/login',
      element: (
        <>
          <Login />
        </>
      ),
    },

    {
      path: '/register',
      element: (
        <>
          <Login />
        </>
      ),
    },

    {
      path: '/registration-form',
      element: (
        <>
          <Register />
        </>
      ),
    },

    {
      path: '/hackathon-registration',
      element: (
        <>
          <HackathonRegistration />
        </>
      ),
    },

    {
      path: '/*',
      element: (
        <>
          <Error />
        </>
      ),
    },

  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
