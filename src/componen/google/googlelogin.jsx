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

	const logga = () => {
		setLoggedIn(false);
		googleLogout();
	};

	if (isLoggedIn) {
		return (
			<div>
				<button onClick={logga()} className="p-3 rounded-lg bg-white text-bold">
					Logout
				</button>
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
