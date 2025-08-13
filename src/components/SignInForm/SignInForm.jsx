import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-md shadow-lg bg-base-100 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>

        {message && (
          <p className="text-error text-sm mb-3 text-center">{message}</p>
        )}

        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignInForm;
