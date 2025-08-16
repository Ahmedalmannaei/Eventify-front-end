import { useState } from "react";

const CommentForm = ({ onAddComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onAddComment(text); // call parent handler
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="input input-bordered flex-grow"
      />
      <button type="submit" className="btn btn-primary btn-sm">
        Send
      </button>
    </form>
  );
};


export default CommentForm;
