import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { UserProvider } from "./components/UserProvider/UserProvider";
import { ApiProvider } from "./components/ApiProvider/ApiProvider";
import App from './components/App/App';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
