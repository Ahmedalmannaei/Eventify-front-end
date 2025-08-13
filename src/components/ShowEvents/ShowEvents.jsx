// src/components/ShowEvents/ShowEvents.jsx
import { useEffect, useState } from "react";
import { getEvents } from "../../services/eventService";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Events</h1>

      {error && <p className="text-error text-center">{error}</p>}

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event._id} className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">{event.name}</h2>
                {event.owner && (
                  <p className="text-sm text-gray-500">
                    Owner: {event.owner.username}
                  </p>
                )}
                <p>{event.description}</p>
                <p className="text-sm text-gray-400">📍 {event.address}</p>
                {event.dateTime && (
                  <p className="text-sm text-gray-400">
                    🗓 {new Date(event.dateTime).toLocaleString()}
                  </p>
                )}
                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ShowEvents;
