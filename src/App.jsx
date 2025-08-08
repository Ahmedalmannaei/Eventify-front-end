import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";
import SignInForm from "./components/SignInForm/SignInForm.jsx";
import { UserContext } from "./contexts/UserContext";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>{/* Protected routes (available only to signed-in users) */}</>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
