import { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dateTime: "",
    owner: "",
    description: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Sending token:", token);

      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          dateTime: new Date(formData.dateTime), 
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Backend error:", errorData);
        return;
      }

      const data = await res.json();
     

     
      setFormData({
        name: "",
        address: "",
        dateTime: "",
        owner: "",
        description: "",
      });
    } catch (err) {
      console.error("❌ Error submitting event:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        required
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="address">Address</label>
      <input
        id="address"
        name="address"
        type="text"
        required
        value={formData.address}
        onChange={handleChange}
      />

      <label htmlFor="dateTime">Date &amp; Time</label>
      <input
        id="dateTime"
        name="dateTime"
        type="datetime-local"
        required
        value={formData.dateTime}
        onChange={handleChange}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        rows="4"
        required
        value={formData.description}
        onChange={handleChange}
      />

      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
