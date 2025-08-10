import { useEffect, useState } from "react";
import { getEvents } from "../../services/eventService";

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div>
      <h1>Events</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <strong>{event.name}</strong> — {event.date}
              {event.owner && ` (Owner: ${event.owner.username})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowEvents;
