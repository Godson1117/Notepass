import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Otplog from "./components/Otplog";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otplog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
