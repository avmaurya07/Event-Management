import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BACKEND_HOST from "../config"; // Adjust the path as necessary

const Event = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${BACKEND_HOST}/api/events/${id}`);
        const data = await response.json();
        setEvent(data[0]);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegisterClick = () => {
    navigate(`/register/${id}`);
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="text-center p-8 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      <h1 className="text-5xl font-extrabold mb-12 text-gray-900">
        {event.title}
      </h1>
      <img
        src={event.img}
        alt={event.title}
        className="max-w-full object-cover rounded-md mb-4"
      />
      <button 
        onClick={handleRegisterClick}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4">
        Register Now
      </button>
    </div>
  );
};

export default Event;