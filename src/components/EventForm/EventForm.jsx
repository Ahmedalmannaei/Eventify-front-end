import { useState } from "react";

const EventForm = (props) => {
  const [formData, setformData] = useState({
    name: "",
    address: "",
    dateTime: "",
    owner: "",
    description: "",
  });
  const handleChange = (event) => {
    setformData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/events", {
        // change to your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Failed to create event");
      }
      const data = await res.json();
      setformData({
        name: "",
        address: "",
        dateTime: "",
        owner: "",
        description: "",
      });
    } catch (err) {}
    {
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          onChange={handleChange}
        />

        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          required
          onChange={handleChange}
        />

        <label htmlFor="dateTime">Date &amp; Time</label>
        <input
          id="dateTime"
          name="dateTime"
          type="datetime-local"
          required
          onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          required
          onChange={handleChange}
        />

        <button>Create Event</button>
      </form>
    </>
  );
};

export default EventForm;
