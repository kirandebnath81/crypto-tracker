import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Pages from "./pages/Pages";

import { CryptoProvider } from "./context/Context";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ToastContainer position="bottom-center" autoClose={2000} />
      <ThemeProvider theme={darkTheme}>
        <CryptoProvider>
          <Pages />
        </CryptoProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
