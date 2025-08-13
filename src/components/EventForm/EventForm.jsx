// src/components/EventForm/EventForm.jsx
import { useState } from "react";

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dateTime: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You must be signed in to create an event.");
        return;
      }

      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // backend will derive owner from this
        },
        body: JSON.stringify({
          ...formData,
          // send a real Date to the backend (ISO string is fine too)
          dateTime: new Date(formData.dateTime),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setMessage(
          errorData?.err || errorData?.message || "Failed to create event."
        );
        return;
      }

      // Optionally read the created event (not used here)
      await res.json();

      // Clear form + show success
      setFormData({ name: "", address: "", dateTime: "", description: "" });
      setMessage("✅ Event created successfully!");
    } catch (err) {
      console.error("❌ Error submitting event:", err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-lg bg-base-100 shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Event</h1>

        {message && (
          <p
            className={`text-sm mb-3 text-center ${
              message.startsWith("✅") ? "text-success" : "text-error"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="dateTime" className="label">
              <span className="label-text">Date &amp; Time</span>
            </label>
            <input
              id="dateTime"
              name="dateTime"
              type="datetime-local"
              value={formData.dateTime}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button type="submit" className="btn btn-primary">
              Create Event
            </button>
            <button
              type="reset"
              onClick={() =>
                setFormData({
                  name: "",
                  address: "",
                  dateTime: "",
                  description: "",
                })
              }
              className="btn btn-ghost"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EventForm;
