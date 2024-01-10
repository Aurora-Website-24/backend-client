import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const [userdata, setUserdata] = useState({});
  console.log("response", userdata)

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/success", { withCredentials: true });

      setUserdata(response.data.user)
    } catch (error) {
      console.log("error", error)
    }
  }

  //logout
  const logout = () => {
    window.open("http://localhost:6005/logout", "_self")
  }

  const hackathon = () => {
    navigate("/hackathon-registration")
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <div>Home</div>
      <div className="mt-6 flex items-center justify-center align-center gap-x-6">
        
        {
          Object?.keys(userdata)?.length > 0 ? (
            <>
              <button
                onClick={logout}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 rounded-md font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Log out
              </button>

              <button
                onClick={hackathon}
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register for Hackathon
              </button>

            </>
          )
            : <button
              onClick={event => window.location.href = '/login'}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>

        }

      </div>
    </>
  )
}

export default Home