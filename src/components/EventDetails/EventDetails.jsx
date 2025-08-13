import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { showEvent } from "../../services/eventService";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

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

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.address}</p>
      <p>{event.dateTime}</p>
      <p>{event.description}</p>
      {event.owner && <p>Owner: {event.owner.username}</p>}
    </div>
  );
};

export default EventDetails;
