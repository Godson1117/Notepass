// import { createTheme } from "@mui/material";
import Homepage from "./components/Homepage";
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
    <div className="App">
     <Homepage />
    </div>
    // </ThemeProvider>
  );
  }

export default App;
