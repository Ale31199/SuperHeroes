import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState(null);

	const handleSignIn = (googleUser) => {
		const profile = googleUser.getBasicProfile();
		setUserInfo({
			id: profile.getId(),
			name: profile.getName(),
			imageUrl: profile.getImageUrl(),
			email: profile.getEmail(),
		});
		setLoggedIn(true);
	};

	const handleSignOut = (googleUser) => {
		googleUser.signOut().then(() => {
			console.log('User signed out.');
			setLoggedIn(false);
		});
	};

	return (
		<div>
			{isLoggedIn ? (
				<div className="p-2 bg-white rounded-xl flex flex-row justify-between items-center w-[200px] h-[35px]">
					<div className="w-[170px] flex justify-start gap-x-3">
						<img src={userInfo.imageUrl} className="w-[20px] h-[20px]" alt="User Profile" />
						<p className="text-bold">{userInfo.name}</p>
					</div>
					<button onClick={handleSignOut} className="text-white bg-red-900 text-sm p-1 rounded-xl text-bold">
						Logout
					</button>
				</div>
			) : (
				<GoogleLogin
					clientId="854917209460-shi180ck4md6fp9f2picmevsooarjm8t.apps.googleusercontent.com"
					scope="profile email"
					onSuccess={handleSignIn}
					buttonProps={{
						className: 'text-white bg-blue-500 text-sm p-2 rounded-xl text-bold',
					}}
				/>
			)}
		</div>
	);
}

export default Login;
