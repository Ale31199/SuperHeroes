import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [userProfileImage, setUserProfileImage] = useState('');

	const handleLoginSuccess = (response) => {
		console.log('Login success:', response);

		const idToken = response.credential.idToken;
		const decodedToken = decodeJwt(idToken);

		const name = decodedToken?.name;
		const imageUrl = decodedToken?.picture;

		setUserName(name || '');
		setUserProfileImage(imageUrl || '');

		setLoggedIn(true);
	};

	const decodeJwt = (token) => {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split('')
				.map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
				.join('')
		);

		return JSON.parse(jsonPayload);
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

					<button onClick={handleLogout} className="text-white bg-red-900 p-1 text-bold">
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
