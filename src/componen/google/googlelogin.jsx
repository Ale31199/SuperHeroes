import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);

	const userName = response.profileObj.name;
	const userProfileImage = response.profileObj.imageUrl;

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

	return (
		<div>
			<select className="p-2 bg-white rounded-xl flex flex-row justify-between w-[200px] h-[35px]">
				<img src={userProfileImage} className="w-[20px] h-[20px]" />
				<p className="text-bold">{userName}</p>
				<option onClick={logga} className="text-red-600 text-bold">
					Logout
				</option>
			</select>
			<GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} buttonText="Accedi con Google" />
		</div>
	);
}

export default Login;
