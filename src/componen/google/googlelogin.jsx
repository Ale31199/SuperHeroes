import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');
	const [userProfileImage, setUserProfileImage] = useState('');
	const [analyticsAccountName, setAnalyticsAccountName] = useState('');

	const handleLoginSuccess = async (response) => {
		console.log('Login success:', response);

		const accessToken = response?.credential?.accessToken;

		setLoggedIn(true);
		if (accessToken) {
			try {
				// Fetch user info from Google Login
				const name = response.profileObj.getName();
				const imageUrl = response.profileObj.imageUrl;

				setUserName(name || '');
				setUserProfileImage(imageUrl || '');

				// Fetch Google Analytics account information
				const analyticsAccountResponse = await axios.get(
					'https://www.googleapis.com/analytics/v3/management/accounts/~all',
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				// Assuming you want the name of the first account in the list
				const firstAnalyticsAccountName = analyticsAccountResponse.data.items[0].name;
				setAnalyticsAccountName(firstAnalyticsAccountName || '');
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
		setUserName('');
		setUserProfileImage('');
		setAnalyticsAccountName('');
		// Other custom logout actions can be added here
	};

	return (
		<div>
			{isLoggedIn && (
				<div className="p-2 bg-white rounded-xl flex flex-row justify-between items-center w-[200px] h-[35px]">
					<div className="w-[170px] flex justify-start gap-x-3">
						<img src={userProfileImage} className="w-[20px] h-[20px]" alt="User Profile" />
						<p className="text-bold">{userName}</p>
					</div>
					<div>
						<p className="text-bold">{analyticsAccountName}</p>
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
