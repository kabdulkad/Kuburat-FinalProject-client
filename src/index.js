import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CurrentSavingsProvider from './CurrentSavingsContext';
import { Auth0Provider } from "@auth0/auth0-react";
//adding for auth0
const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId =process.env.REACT_APP_AUTH0_CLIENT_ID 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider domain={domain} clientId={clientId} redirectUri="http://localhost:3000/savings">
    <CurrentSavingsProvider>
      <App />
    </CurrentSavingsProvider>
  </Auth0Provider>
 
);

