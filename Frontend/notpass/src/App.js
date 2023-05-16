// import { createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import { ThemeProvider } from "@emotion/react";

// const theme=createTheme({
//   palette:{
//     primary:{
//       main:'#263238'
//     }
//   }
// })

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
