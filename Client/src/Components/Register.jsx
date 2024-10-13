import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BACKEND_HOST from "../config";

const Register = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    associateId: "",
    name: "",
    phoneNumber: "",
    email: "",
    role: "associate", // default value
  });
  const [errors, setErrors] = useState({});
  const [event, setEvent] = useState(null);
  const [eventStatus, setEventStatus] = useState("No event found");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${BACKEND_HOST}/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.length > 0) {
          const foundEvent = data[0];
          const [day, month, year] = foundEvent.date.split("-");
          const eventDate = new Date(year, month - 1, day);
          const today = new Date();

          // Normalize the dates to remove the time component
          eventDate.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);

          if (eventDate >= today) {
            setEvent(foundEvent);
            setEventStatus("");
          } else {
            setEventStatus("Event is over");
          }
        } else {
          setEventStatus("No event found");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        setEventStatus("Error fetching event");
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (formData.role === "associate" && !formData.associateId)
      newErrors.associateId = "Associate ID is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const errorMessages = Object.values(validationErrors).join("\n");
      alert(`Please fill all the required fields:\n${errorMessages}`);
    } else {
      const data = {
        id: formData.associateId,
        name: formData.name,
        role: formData.role,
        email: formData.email,
        phone: formData.phoneNumber,
        eventId: id,
        eventTitle: event.title,
        eventDate: event.date,
        eventType: event.eventType,
        isPaidEvent: event.isPaidEvent,
        contributionAmount: event.contributionAmount,
        venue: event.venue,
        venueAddress: event.venueAddress,
        speakers: event.speakers,
      };
      try {
        const response = await axios.post(`${BACKEND_HOST}/api/register`, data);
        if (response.status === 201) {
          alert("Registration successful!");
          setErrors({});
          // Reset the form
          setFormData({
            associateId: "",
            name: "",
            phoneNumber: "",
            email: "",
            role: "associate", // default value
          });
        } else if (response.status === 200) {
          alert("Already registered");
          setErrors({});
          // Reset the form
          setFormData({
            associateId: "",
            name: "",
            phoneNumber: "",
            email: "",
            role: "associate", // default value
          });
        } else {
          alert("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Error registering:", error);
        alert("Error registering. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {event ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">
            Register to Event: {event.title}
          </h1>
          {event.date && (
            <h6 className="text-lg font-semibold mb-4 text-center">
              Date:{" "}
              {new Date(
                event.date.split("-").reverse().join("-")
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </h6>
          )}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
          >
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role: <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="associate">Associate</option>
                <option value="new">New to IMC</option>
              </select>
            </div>
            {formData.role === "associate" && (
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Associate ID: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="associateId"
                  value={formData.associateId}
                  onChange={handleChange}
                  placeholder="Enter your Associate ID"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.associateId && (
                  <p className="text-red-500 text-xs italic">
                    {errors.associateId}
                  </p>
                )}
              </div>
            )}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs italic">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email: <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Register
            </button>
          </form>
        </>
      ) : (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 max-w-sm mx-auto shadow-lg"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-red-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0-9a1.5 1.5 0 00-1.5 1.5v4a1.5 1.5 0 003 0v-4A1.5 1.5 0 0010 6z" />
              </svg>
            </div>
            <div>
              <strong className="font-bold">Notice: </strong>
              <span className="block sm:inline">{eventStatus}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;