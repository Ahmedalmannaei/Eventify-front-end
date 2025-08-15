import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { showEvent } from "../../services/eventService";
import { Link } from "react-router-dom";
const EventDetails = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventDetails = await showEvent(id);
        setEvent(eventDetails);
      } catch (err) {
        console.error("Error fetching event details:", err);
      }
    };
    fetchEvent();
  }, [id]);
  if (!event) {
    return <p className="text-center mt-10">Loading event details...</p>;
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 min-h-screen">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl">{event.name}</h1>

          <p className="text-sm text-gray-500">📍 {event.address}</p>

          <p className="text-sm text-gray-400">
            🗓 {new Date(event.dateTime).toLocaleString()}
          </p>

          <p className="mt-4">{event.description}</p>

          {event.owner && (
            <p className="text-sm text-gray-500 mt-2">
              👤 Owner: {event.owner.username}
            </p>
          )}

          <div className="card-actions justify-end mt-6">
            <Link to={`/events/edit/${id}`} className="btn btn-warning btn-sm">
              Edit
            </Link>
            <button className="btn btn-error btn-sm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
