import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserInfoProvider } from "./context/userInfoContext";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <UserInfoProvider>
          <App />
        </UserInfoProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
