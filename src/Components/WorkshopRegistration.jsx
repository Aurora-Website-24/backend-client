import React, { useState, useEffect } from 'react'
import axios from "axios";

const WorkshopRegistration = () => {

    const [userdata, setUserdata] = useState({});
    // console.log("response", userdata)

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:6005/login/success", { withCredentials: true });

            setUserdata(response.data.user)
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const allEvents = {
        "E1_TS1_1": "ISTE",
        "E2_TS1_2": "ACM",
        "E3_TS2_1": "IECSE",
        "E4_TS2_2": "IEMCT",
        "E5_TS3_1": "MIST",
        "E6_TS3_2": "Astronomy",
        "E7_TS3_3": "IOSD",
        "E8_TS4_1": "IE-ENC",
    };

    const registered = []
    const registeredWorkshops = []

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
            const response = await fetch(`http://localhost:6005/workshop-registration/${userdata._id}`, {
              method: 'PATCH',
              body: JSON.stringify({workshops: registeredWorkshops}),
              headers: {
                'Content-Type': 'application/json'
              }
            });
      
            const json = await response.json();
            console.log("Response JSON: ", json);
          } catch (error) {
            console.error("Error updating data:", error);
          }

          clearSelection()
    }

    const clearSelection = () => {
        for(let i=0; i<registered.length; i++){
            document.getElementById(registered[i]).checked=false
            registered.splice(i, 1)
            registeredWorkshops.splice(i, 1)
            i--
        }
        console.log(registered)
    }

    function updateEvent(eventID) {

        let timeSlot = eventID.substring(3, 6)
        for (let i = 0; i < registered.length; i++) {
            let found = 0
            if (registered[i].includes(timeSlot)) {
                found = 1
                document.getElementById(registered[i]).checked = false
                registered.splice(i, 1)
                registered.push(eventID)
                document.getElementById(eventID).checked = true
            }
            else if (i === registered.length - 1 && found === 0) {
                registered.push(eventID)
                document.getElementById(eventID).checked = true
            }
        }

        if (registered.length === 0) {
            registered.push(eventID)
            document.getElementById(eventID).checked = true
        }
        console.log(registered)
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