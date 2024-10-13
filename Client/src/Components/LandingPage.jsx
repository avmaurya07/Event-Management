import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BACKEND_HOST from "../config"; // Adjust the path as necessary

const LandingPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
    const unformattedToday = new Date();
  const today = `${String(unformattedToday.getDate()).padStart(2, '0')}-${String(unformattedToday.getMonth() + 1).padStart(2, '0')}-${unformattedToday.getFullYear()}`;
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BACKEND_HOST}/api/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/event/${id}`);
  };

  const todayEvents = events.filter((event) => event.date === today);
  const upcomingEvents = events.filter((event) => event.date > today);
  const pastEvents = events.filter((event) => event.date < today);

  return (
    <div className="text-center p-8 bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen">
      <h1 className="text-5xl font-extrabold mb-12 text-gray-900">
        Events
      </h1>

      {todayEvents.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Today's Events</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {todayEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg w-64 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-2xl"
                onClick={() => handleCardClick(event.id)}
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-64 h-64 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  {event.title}
                </h2>
                <p className="text-gray-600 mb-4">{event.date}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {upcomingEvents.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Upcoming Events</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg w-64 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-2xl"
                onClick={() => handleCardClick(event.id)}
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-64 h-64 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  {event.title}
                </h2>
                <p className="text-gray-600 mb-4">{event.date}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {pastEvents.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Past Events</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg w-64 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-2xl"
                onClick={() => handleCardClick(event.id)}
              >
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-64 h-64 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                  {event.title}
                </h2>
                <p className="text-gray-600 mb-4">{event.date}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {todayEvents.length === 0 && upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <p className="text-2xl text-gray-700">No events available</p>
      )}
    </div>
  );
};

export default LandingPage;