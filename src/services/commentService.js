const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/comments`;

// Get all comments for an event
const getCommentsByEvent = async (eventId) => {
  try {
    const res = await fetch(`${BASE_URL}/event/${eventId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// Create a comment
const createComment = async (eventId, commentFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event: eventId, ...commentFormData }),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// Update comment
const updateComment = async (commentId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${commentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

// Delete comment
const deleteComment = async (commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export { getCommentsByEvent, createComment, updateComment, deleteComment };
