import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const ClientID = '854917209460-shi180ck4md6fp9f2picmevsooarjm8t.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={ClientID}>
			<App />
		</GoogleOAuthProvider>
	</React.StrictMode>
);
