import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar.jsx";
import SignUpForm from "./components/SignUpForm/SignUpForm.jsx";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Non-user routes (available only to guests) */}
        <Route path="/sign-up" element={<SignUpForm />} />
        {/* <Route path='/sign-in' element={<SignInForm />} /> */}
      </Routes>
    </>
  );
};

export default App;
