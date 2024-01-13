import React, { useState, useEffect } from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function HackathonRegistration() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({});

    //console.log("response", userdata)
    const [userdata, setUserdata] = useState({});
    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:6005/login/success", { withCredentials: true });
            setUserdata(response.data.user)
        } catch (error) {
            console.log("error", error)
        }
    }

    const [prevTeamData, setPrevTeamData] = useState({});
    const getHackathonData = async () => {
        if (userdata.hackathon === true) {
            try {
                const response = await axios.get("http://localhost:6005/hackathon-team-data", { withCredentials: true });
                setPrevTeamData(response.data.hackathon)
                setFormData({
                    leaderName: userdata.name,
                    leaderPhoneNo: userdata.phoneNo,
                    leaderRegNo: userdata.regNo,
                    leaderLearnerid: userdata.learnerid,
                })
            } catch (error) {
                console.log("error: ", error)
            }
        }
        else if (userdata.hackathon === false) {
            setPrevTeamData({
                teamName: '',
                teamSize: null,

                leaderName: '',
                leaderPhoneNo: null,
                leaderRegNo: null,
                leaderLearnerid: '',

                member1Name: '',
                member1PhoneNo: null,
                member1RegNo: null,

                member2Name: '',
                member2PhoneNo: null,
                member2RegNo: null,

                member3Name: '',
                member3PhoneNo: null,
                member3RegNo: null,

                member4Name: '',
                member4PhoneNo: null,
                member4RegNo: null,

                upiID: '',
                txnID: '',
                screenshot: '',
            });
        }

    }

    useEffect(() => {
        getUser()
        getHackathonData()
    }, [])

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

        if (userdata.hackathon === true) {
            try {
                const response = await fetch(`http://localhost:6005/hackathon-update-form/${prevTeamData._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const json = await response.json();
                console.log("Response update patch JSON: ", json);
            } catch (error) {
                console.error("Error updating data:", error);
                // Handle the error as needed
            }
        }

        else {
            try {
                const response = await fetch(`http://localhost:6005/hackathon-registration/`, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const json = await response.json();
                console.log("Response update post JSON: ", json);
            } catch (error) {
                console.error("Error updating data:", error);
            }

            try {
                const response = await fetch(`http://localhost:6005/register/${userdata._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ hackathon: true }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
                console.error("Error updating data:", error);
            }
        }
        navigate('/')
    }

    const uploadScreenshot = async (e) => {
        e.preventDefault()

        if (!image) return;

        const uploadbtn = document.getElementById('upload');
        if (uploadbtn) {
            uploadbtn.innerText = 'Uploading...';
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

    return (
        <form onSubmit={handleSubmit} className='container mx-auto sm max-w-96'>
            <div className="space-y-12">

                <h2 className="text-base font-semibold leading-7 text-gray-900">Register for Hackathon</h2>

                <div className="border-b border-gray-900/10 pb-12" />

                <div className="border-b border-gray-900/10 pb-12" >

                    <h2 className="text-base font-semibold leading-7 text-gray-900">Team Leader</h2>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        // defaultValue={userdata.name}
                                        required
                                        type="text"
                                        name="leaderName"
                                        id="leaderName"
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
                                        // defaultValue={userdata.phoneNo}
                                        required
                                        type="number"
                                        name="leaderPhoneNo"
                                        id="leaderPhoneNo"
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
                                        // defaultValue={userdata.regNo}
                                        required
                                        type="number"
                                        name="leaderRegNo"
                                        id="leaderRegNo"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
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
                                        // defaultValue={userdata.learnerid}
                                        required
                                        type="email"
                                        name="leaderLearnerid"
                                        id="leaderLearnerid"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>




                <div className="border-b border-gray-900/10 pb-12" >

                    <h2 className="text-base font-semibold leading-7 text-gray-900">Team Details</h2>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="teamName" className="block text-sm font-medium leading-6 text-gray-900">
                                Team Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        // defaultValue={prevTeamData.teamName}
                                        required
                                        type="text"
                                        name="teamName"
                                        id="teamName"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="sm:col-span-4">
                            <label htmlFor="regNo" className="block text-sm font-medium leading-6 text-gray-900">
                                Team Size
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        // defaultValue={prevTeamData.teamSize}
                                        required
                                        type="number"
                                        name="teamSize"
                                        id="teamSize"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>





                <div className="border-b border-gray-900/10 pb-12" >

                    <h2 className="text-base font-semibold leading-7 text-gray-900">Member 1</h2>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        // defaultValue={formData.member1Name}
                                        required
                                        type="text"
                                        name="member1Name"
                                        id="member1Name"
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
                                        // defaultValue={formData.member1PhoneNo}
                                        required
                                        type="number"
                                        name="member1PhoneNo"
                                        id="member1PhoneNo"
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
                                        // defaultValue={formData.member1RegNo}
                                        required
                                        type="number"
                                        name="member1RegNo"
                                        id="member1RegNo"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>




                <div className="border-b border-gray-900/10 pb-12" >

                    <h2 className="text-base font-semibold leading-7 text-gray-900">Member 2</h2>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        // defaultValue={formData.member2Name}
                                        type="text"
                                        name="member2Name"
                                        id="member2Name"
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
                                        // defaultValue={formData.member2PhoneNo}
                                        type="number"
                                        name="member2PhoneNo"
                                        id="member2PhoneNo"
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
                                        // defaultValue={formData.member2RegNo}
                                        type="number"
                                        name="member2RegNo"
                                        id="member2RegNo"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>




                <div className="border-b border-gray-900/10 pb-12" >

                    <h2 className="text-base font-semibold leading-7 text-gray-900">Member 3</h2>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        // defaultValue={formData.member3Name}
                                        type="text"
                                        name="member3Name"
                                        id="member3Name"
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
                                        // defaultValue={formData.member3PhoneNo}
                                        type="number"
                                        name="member3PhoneNo"
                                        id="member3PhoneNo"
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
                                        // defaultValue={formData.member3RegNo}
                                        type="number"
                                        name="member3RegNo"
                                        id="member3RegNo"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>




                <div className="border-b border-gray-900/10 pb-12" >

                    <h2 className="text-base font-semibold leading-7 text-gray-900">Member 4</h2>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        // defaultValue={formData.member4Name}
                                        type="text"
                                        name="member4Name"
                                        id="member4Name"
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
                                        // defaultValue={formData.member4PhoneNo}
                                        type="number"
                                        name="member4PhoneNo"
                                        id="member4PhoneNo"
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
                                        // defaultValue={formData.member4RegNo}
                                        type="number"
                                        name="member4RegNo"
                                        id="member4RegNo"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
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

export default HackathonRegistration