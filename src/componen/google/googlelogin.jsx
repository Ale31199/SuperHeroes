import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [userProfileImage, setUserProfileImage] = useState('');

	const handleLoginSuccess = (response) => {
		console.log('Login success:', response);
		const accessToken = response?.credential?.accessToken;

		if (accessToken) {
			axios
				.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)
				.then((response) => {
					const name = response.data.name;
					const imageUrl = response.data.picture;
					setUserName(name || '');
					setUserProfileImage(imageUrl || '');
				})
				.catch((error) => {
					console.error('Error fetching user info:', error);
				});
		}

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
				<div className="p-2 bg-white rounded-xl flex flex-row justify-between items-center w-[200px] h-[35px]">
					<div className="w-[170px] flex justify-start gap-x-3">
						<img src={userProfileImage} className="w-[20px] h-[20px]" alt="User Profile" />
						<p className="text-bold">{userName}</p>
					</div>

					<button onClick={handleLogout} className="text-white bg-red-900 text-sm p-1 rounded-xl text-bold">
						Logout
					</button>
				</div>
			)}

			{!isLoggedIn && (
				<GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} buttonText="Accedi con Google" />
			)}
		</div>
	);
}

export default Login;
