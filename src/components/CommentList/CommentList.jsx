const CommentList = ({ comments, currentUserId, onDeleteComment }) => {
  if (!comments || comments.length === 0) return <p>No comments yet.</p>;

  return (
    <div className="flex flex-col gap-2">
      {comments.map((c) => (
        <div
          key={c._id}
          className="p-3 border rounded-md bg-base-100 flex justify-between items-start"
        >
          <div>
            <strong>{c.owner?.username || "Unknown"}</strong>: {c.comment}
          </div>

          {currentUserId === c.owner?._id && (
            <button
              className="btn btn-xs btn-error ml-4 self-start"
              onClick={() => onDeleteComment(c._id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
