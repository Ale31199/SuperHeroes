import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState(null);

	const handleLoginSuccess = (response) => {
		console.log('Login success:', response);
		setLoggedIn(true);
		const profile = response.getBasicProfile();
		setUserInfo({
			id: profile.getId(),
			name: profile.getName(),
			imageUrl: profile.getImageUrl(),
			email: profile.getEmail(),
		});
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
						<img src={userInfo.imageUrl} className="w-[20px] h-[20px]" alt="User Profile" />
						<p className="text-bold">{userInfo.name}</p>
					</div>
					<button onClick={handleLogout} className="text-white bg-red-900 text-sm p-1 rounded-xl text-bold">
						Logout
					</button>
				</div>
			)}

			{!isLoggedIn && (
				<GoogleLogin
					className="g-signin2"
					onSuccess={handleLoginSuccess}
					onError={handleLoginError}
					buttonText="Accedi con Google"
				/>
			)}
		</div>
	);
}

export default Login;
