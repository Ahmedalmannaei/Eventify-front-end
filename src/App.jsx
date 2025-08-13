import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import { UserContext } from "./contexts/UserContext";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import EventForm from "./components/EventForm/EventForm.jsx";
import ShowEvents from "./components/ShowEvents/ShowEvents.jsx";

const App = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path="new" element={<EventForm />} />
            <Route path="all" element={<ShowEvents />} />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/events/show/:id" element={<EventDetails />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
