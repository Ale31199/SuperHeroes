import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [userProfileImage, setUserProfileImage] = useState('');

	const handleLoginSuccess = (response) => {
		console.log('Login success:', response);

		// Estrarre informazioni dell'utente
		const name = response?.profileObj?.name;
		const imageUrl = response?.profileObj?.imageUrl;

		// Aggiornare lo stato con le informazioni dell'utente
		setUserName(name || '');
		setUserProfileImage(imageUrl || '');

		// Impostare lo stato di accesso a true
		setLoggedIn(true);
	};

	const handleLoginError = (error) => {
		console.log('Login error:', error);
	};

	const handleLogout = () => {
		console.log('Logout');
		setLoggedIn(false);
		setUserName('');
		setUserProfileImage('');
		// Altre azioni di logout personalizzate possono essere aggiunte qui
	};

	return (
		<div>
			{isLoggedIn && (
				<select className="p-2 bg-white rounded-xl flex flex-row justify-between w-[200px] h-[35px]">
					<img src={userProfileImage} className="w-[20px] h-[20px]" alt="User Profile" />
					<p className="text-bold">{userName}</p>

					<option onClick={handleLogout} className="text-red-600 text-bold">
						Logout
					</option>
				</select>
			)}

			{!isLoggedIn && (
				<GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} buttonText="Accedi con Google" />
			)}
		</div>
	);
}

export default Login;
