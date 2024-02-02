import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [userProfileImage, setUserProfileImage] = useState('');

	const handleLoginSuccess = async (response) => {
		console.log('Login success:', response);

		const accessToken = response?.credential?.accessToken;

		setLoggedIn(true);
		if (accessToken) {
			try {
				// Effettua una chiamata API a Google per ottenere le informazioni dell'utente
				const userInfoResponse = await axios.get(`https://www.googleapis.com/auth/userinfo.profile`);

				const name = userInfoResponse.userinfo.profile;
				const imageUrl = userInfoResponse.data.picture;

				setUserName(name || '');
				setUserProfileImage(imageUrl || '');
			} catch (error) {
				console.error('Error fetching user info:', error);
			}
		}
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
				<GoogleLogin
					scope="https://www.googleapis.com/auth/userinfo.profile"
					onSuccess={handleLoginSuccess}
					onError={handleLoginError}
					buttonText="Accedi con Google"
				/>
			)}
		</div>
	);
}

export default Login;
