import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { showEvent } from "../../services/eventService";
import { UserContext } from "../../contexts/UserContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // get user from context

  const [userId, setUserId] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Set userId from context or localStorage
  useEffect(() => {
    if (user && user._id) {
      setUserId(user._id);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUserId(storedUser?._id);
    }
  }, [user]);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventDetails = await showEvent(id);
        setEvent(eventDetails);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // Delete event
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Failed to delete event");
      }
      navigate("/all");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading || !event) {
    return <p className="text-center mt-10">Loading event details...</p>;
  }

  // Check if logged-in user is the owner
  const isOwner = event.owner?._id === userId;

  // Debug logs
  console.log("event.owner._id:", event.owner?._id);
  console.log("userId:", userId);
  console.log("is owner?", isOwner);

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

          {isOwner && (
            <div className="card-actions justify-end mt-6">
              <Link
                to={`/events/edit/${id}`}
                className="btn btn-warning btn-sm"
              >
                Edit
              </Link>
              <button className="btn btn-error btn-sm" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
