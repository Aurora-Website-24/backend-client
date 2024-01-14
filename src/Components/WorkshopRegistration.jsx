import React, { useState, useEffect } from 'react'
import axios from "axios";

const WorkshopRegistration = () => {

    var registeredWorkshops = []
    const [logged, setLogged] = useState(0)
    const [registered, setRegistered] = useState([])
    const [userData, setUserData] = useState({});

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:6005/login/success", { withCredentials: true });
            window.localStorage.setItem('logged', 1)
            window.localStorage.setItem('uniqueID', response.data.user._id);
            console.log(response.data.user.workshops)
            setUserData(response.data.user)

            let a = response.data.user.workshops
            let newRegistered = []
            for (let i = 0; i < a.length; i++) {
                if (a[i] === "ISTE") { newRegistered.push("E1_TS1_1"); document.getElementById("E1_TS1_1").checked = true }
                else if (a[i] === "ACM") { newRegistered.push("E2_TS1_2"); document.getElementById("E2_TS1_2").checked = true }
                else if (a[i] === "IECSE") { newRegistered.push("E3_TS2_1"); document.getElementById("E3_TS2_1").checked = true }
                else if (a[i] === "IEMCT") { newRegistered.push("E4_TS2_2"); document.getElementById("E4_TS2_2").checked = true }
                else if (a[i] === "MIST") { newRegistered.push("E5_TS3_1"); document.getElementById("E5_TS3_1").checked = true }
                else if (a[i] === "Astronomy") { newRegistered.push("E6_TS3_2"); document.getElementById("E6_TS3_2").checked = true }
                else if (a[i] === "IOSD") { newRegistered.push("E7_TS3_3"); document.getElementById("E7_TS3_3").checked = true }
                else if (a[i] === "IE-ENC") { newRegistered.push("E8_TS4_1"); document.getElementById("E8_TS4_1").checked = true }
            }
            setRegistered(newRegistered)
        } catch (error) {
            console.log("error", error)
        }
        console.log(registered)
    }

    const getUpdatedUser = async () => {
        try {
            const response = await axios.get(`http://localhost:6005/updated-user-data/${localStorage.getItem('uniqueID')}`, { withCredentials: true });
            console.log("next update: ", response.data.user.workshop)
            setUserData(response.data.user)
            let a = response.data.user.workshops
            let newRegistered = []
            for (let i = 0; i < a.length; i++) {
                console.log("hello", i, a[i]);
                if (a[i] === "ISTE") { newRegistered.push("E1_TS1_1"); document.getElementById("E1_TS1_1").checked = true }
                else if (a[i] === "ACM") { newRegistered.push("E2_TS1_2"); document.getElementById("E2_TS1_2").checked = true }
                else if (a[i] === "IECSE") { newRegistered.push("E3_TS2_1"); document.getElementById("E3_TS2_1").checked = true }
                else if (a[i] === "IEMCT") { newRegistered.push("E4_TS2_2"); document.getElementById("E4_TS2_2").checked = true }
                else if (a[i] === "MIST") { newRegistered.push("E5_TS3_1"); document.getElementById("E5_TS3_1").checked = true }
                else if (a[i] === "Astronomy") { newRegistered.push("E6_TS3_2"); document.getElementById("E6_TS3_2").checked = true }
                else if (a[i] === "IOSD") { newRegistered.push("E7_TS3_3"); document.getElementById("E7_TS3_3").checked = true }
                else if (a[i] === "IE-ENC") { newRegistered.push("E8_TS4_1"); document.getElementById("E8_TS4_1").checked = true }
            }
            setRegistered(newRegistered)
        } catch (error) {
            console.log("error", error)
        }
        console.log(registered)

    }

    useEffect(() => {
        window.localStorage.setItem('logged', 0)
        if( window.localStorage.getItem('logged')==0) getUser()
        else getUpdatedUser()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        for (let i = 0; i < registered.length; i++) {
            switch (registered[i]) {
                case "E1_TS1_1": registeredWorkshops.push("ISTE"); break;
                case "E2_TS1_2": registeredWorkshops.push("ACM"); break;
                case "E3_TS2_1": registeredWorkshops.push("IECSE"); break;
                case "E4_TS2_2": registeredWorkshops.push("IEMCT"); break;
                case "E5_TS3_1": registeredWorkshops.push("MIST"); break;
                case "E6_TS3_2": registeredWorkshops.push("Astronomy"); break;
                case "E7_TS3_3": registeredWorkshops.push("IOSD"); break;
                case "E8_TS4_1": registeredWorkshops.push("IE-ENC"); break;
            }
        }
        console.log("workshops: ", registeredWorkshops)

        try {
            const response = await fetch(`http://localhost:6005/workshop-registration/${userData._id}`, {
                method: 'PATCH',
                body: JSON.stringify({ workshops: registeredWorkshops }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();
            console.log("Response JSON: ", json);

        } catch (error) {
            console.error("Error updating data:", error);
        }

        registeredWorkshops = []
        getUpdatedUser()
    }

    const clearSelection = () => {
        let a = document.getElementsByClassName('event')
        for (let i = 0; i < a.length; i++) {
            a[i].checked = false
        }
        console.log(registered)
        setRegistered([])
    }

    function updateEvent(eventID) {

        // console.log("before", registered)

        let timeSlot = eventID.substring(3, 6)
        let newRegistered = [...registered];

        for (let i = 0; i < newRegistered.length; i++) {
            let found = 0
            if (newRegistered[i].includes(timeSlot)) {
                found = 1
                document.getElementById(newRegistered[i]).checked = false
                newRegistered.splice(i, 1)
                newRegistered.push(eventID)
                document.getElementById(eventID).checked = true
                setRegistered(newRegistered)
            }
            else if (i === newRegistered.length - 1 && found === 0) {
                newRegistered.push(eventID)
                document.getElementById(eventID).checked = true
                setRegistered(newRegistered)
            }
        }

        if (newRegistered.length === 0) {
            console.log(" 0 len")
            newRegistered.push(eventID)
            document.getElementById(eventID).checked = true
            setRegistered(newRegistered)
        }
        // console.log("after", registered)
    }

    return (
        <>
            <div>WorkshopRegistration</div>

            time slot 1
            <div className="flex items-center mb-4">
                <input id="E1_TS1_1"
                    type="checkbox"
                    name="E1_TS1_1"
                    className="event w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onClick={() => updateEvent("E1_TS1_1")}
                />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ISTE</label>
            </div>
            <div className="flex items-center">
                <input
                    id="E2_TS1_2"
                    type="checkbox"
                    name="E2_TS1_2"
                    className="event w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onClick={() => updateEvent("E2_TS1_2")}
                />
                <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">ACM</label>
            </div>


            time slot 2
            <div className="flex items-center mb-4">
                <input
                    id="E3_TS2_1"
                    type="checkbox"
                    name="E3_TS2_1"
                    className="event w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onClick={() => updateEvent("E3_TS2_1")}
                />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">IECSE</label>
            </div>
            <div className="flex items-center">
                <input
                    id="E4_TS2_2"
                    type="checkbox"
                    name="E4_TS2_2"
                    className="event w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onClick={() => updateEvent("E4_TS2_2")}
                />
                <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">IEMCT</label>
            </div>


            time slot 3
            <div className="flex items-center mb-4">
                <input
                    id="E5_TS3_1"
                    type="checkbox"
                    name="E5_TS3_1"
                    className="event w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onClick={() => updateEvent("E5_TS3_1")}
                />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">MIST</label>
            </div>
            <div className="flex items-center">
                <input
                    id="E6_TS3_2"
                    type="checkbox"
                    name="E6_TS3_2"
                    className="event w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onClick={() => updateEvent("E6_TS3_2")}
                />
                <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Astronomy</label>
            </div>
            <div className="flex items-center">
                <input
                    id="E7_TS3_3"
                    type="checkbox"
                    name="E7_TS3_3"
                    className="event w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onClick={() => updateEvent("E7_TS3_3")}
                />
                <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">IOSD</label>
            </div>


            time slot 4
            <div className="flex items-center mb-4">
                <input
                    id="E8_TS4_1"
                    type="checkbox"
                    name="E8_TS4_1"
                    className="event w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onClick={() => updateEvent("E8_TS4_1")}
                />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">IE-ENC</label>
            </div>

            <button
                onClick={(e) => handleSubmit(e)}
            >Submit</button>

            <button
                onClick={() => clearSelection()}
            >Clear</button>

        </>

    )
}

export default WorkshopRegistration