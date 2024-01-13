import React, { useState, useEffect } from 'react'
import '@tailwindcss/forms'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import qr from "../logo.svg"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const [userdata, setUserdata] = useState({});
  // console.log("response userdata", userdata)
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/success", { withCredentials: true });
      console.log("response axios", response)
      setUserdata(response.data.user)

      // setUserdata(response.data.user)
      console.log(userdata)

      if (response.data.user.name !== "null"
        && response.data.user.phoneNo !== 0
        && response.data.user.regNo !== 0
        && response.data.user.branch !== "null"
        && response.data.user.learnerid !== "null"
        && response.data.user.upiId !== "null"
        && response.data.user.txnId !== "null"
        && response.data.user.screenshot !== "null") {
        navigate("/")
      }

    } catch (error) {
      console.log("axios error: ", error)
      navigate("*")
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const [formData, setFormData] = useState({

    name: 'null',
    phoneNo: 0,
    regNo: 0,
    branch: 'null',
    learnerid: 'null',
    upiID: 'null',
    txnID: 'null',
    screenshot: 'null',
    hackathon: false,
  });

  const [image, setImage] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await updateData(userdata._id);
      navigate("/");
    } catch (error) {
      console.log("Error during form submission: ", error);
      navigate("*");
    }
  };

  const uploadScreenshot = async (e) => {
    e.preventDefault()
    if (!image) return;

    const uploadbtn = document.getElementById('upload');
    if (uploadbtn) {
      uploadbtn.innerText = 'Uploading';
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Aurora");
    data.append("cloud_name", "days7d2mj");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/days7d2mj/image/upload", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      console.log(result);

      // Update the screenshot field in the form data
      setFormData({ ...formData, screenshot: result.secure_url });
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error; // Propagate the error to the calling function
    }
    if (uploadbtn) {
      uploadbtn.style.backgroundColor = 'green';
      uploadbtn.innerText = 'Uploaded';

      setTimeout(() => {
        uploadbtn.style.display = 'none'
      }, 3000);
    }
  };


  // Define the asynchronous function
  const updateData = async (id) => {
    try {
      const response = await fetch(`http://localhost:6005/register/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();
      console.log("Response JSON: ", json);
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle the error as needed
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className='container mx-auto sm max-w-96'>
      <div className="space-y-12">

        <h2 className="text-base font-semibold leading-7 text-gray-900">Register for Aurora</h2>

        <div className="border-b border-gray-900/10 pb-12" />

        <div className="border-b border-gray-900/10 pb-12" >

          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>


          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phoneNo" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="number"
                    name="phoneNo"
                    id="phoneNo"
                    autoComplete="phone"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="regNo" className="block text-sm font-medium leading-6 text-gray-900">
                Registration Number
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="number"
                    name="regNo"
                    id="regNo"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="branch" className="block text-sm font-medium leading-6 text-gray-900">
                Branch
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="text"
                    name="branch"
                    id="branch"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="learnerid" className="block text-sm font-medium leading-6 text-gray-900">
                Learner's ID
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="email"
                    name="learnerid"
                    id="learnerid"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">


          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-4">
              <label htmlFor="upiID" className="block text-sm font-medium leading-6 text-gray-900">
                UPI ID
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="text"
                    name="upiID"
                    id="upiID"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="txnID" className="block text-sm font-medium leading-6 text-gray-900">
                Transaction ID
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    required
                    type="text"
                    name="txnID"
                    id="txnID"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Payment QR code
              </label>
              <img src={qr}></img>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Add Payment Screenshot
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        required
                        id="file-upload"
                        name="screenshot"
                        type="file"
                        className="sr-only"
                        onChange={(e) => { setImage(e.target.files[0]) }} />
                    </label>


                  </div>
                  {image ? <><p className="text-xs leading-5 text-gray-600 flex justify-center"><img src={URL.createObjectURL(image)} alt="Selected" className="ml-2 w-10 h-10 object-cover rounded-full" /></p></> : null}
                  <p className="text-xs leading-5 text-gray-600 flex justify-center">PNG, JPG</p>
                  <br />
                  <button id='upload' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={uploadScreenshot}>
                    Upload
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Register
        </button>
      </div>
    </form>
  )
}

export default Register;