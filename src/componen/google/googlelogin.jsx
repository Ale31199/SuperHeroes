import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState(null);

	const handleLoginSuccess = async (response) => {
		console.log('Login success:', response);
		const accessToken = '854917209460-shi180ck4md6fp9f2picmevsooarjm8t.apps.googleusercontent.com';
		setLoggedIn(true);
		if (accessToken) {
			try {
				const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				setUserInfo(response.data);
			} catch (error) {
				console.error('Error fetching user or analytics info:', error);
			}
		}
	};

	const handleLoginError = (error) => {
		console.log('Login error:', error);
	};

	const handleLogout = () => {
		console.log('Logout');
		setLoggedIn(false);
	};

	return (
		<div>
			{isLoggedIn && (
				<div className="p-2 bg-white rounded-xl flex flex-row justify-between items-center w-[200px] h-[35px]">
					<div className="w-[170px] flex justify-start gap-x-3">
						<img src={userInfo.picture} className="w-[20px] h-[20px]" alt="User Profile" />
						<p className="text-bold">{userInfo.name}</p>
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
