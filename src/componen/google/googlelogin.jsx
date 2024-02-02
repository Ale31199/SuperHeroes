import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);

	const handleLoginSuccess = (response) => {
		console.log('Login success:', response);
		setLoggedIn(true);
	};

	const handleLoginError = (error) => {
		console.log('Login error:', error);
	};

	const handleLogout = () => {
		console.log('Logout');
		setLoggedIn(false);
		googleLogout();
		// Altre azioni di logout personalizzate possono essere aggiunte qui
	};

	if (isLoggedIn) {
		return (
			<div>
				<p>Utente loggato</p>
				<GoogleLogin onSuccess={handleLogout} buttonText="Logout" />
			</div>
		);
	} else {
		return (
			<div>
				<GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} buttonText="Accedi con Google" />
			</div>
		);
	}
}

export default Login;
