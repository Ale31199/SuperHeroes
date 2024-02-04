import React, { useState, useEffect } from 'react';

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

	const handleSignOut = () => {
		const auth2 = window.gapi.auth2.getAuthInstance();
		auth2.signOut().then(() => {
			console.log('User signed out.');
			setLoggedIn(false);
		});
	};

	const initGoogleSignIn = () => {
		window.gapi.load('auth2', () => {
			window.gapi.auth2
				.init({
					client_id: '854917209460-shi180ck4md6fp9f2picmevsooarjm8t.apps.googleusercontent.com',
				})
				.then(() => {
					const auth2 = window.gapi.auth2.getAuthInstance();

					// Check if the user is already signed in
					if (auth2.isSignedIn.get()) {
						const googleUser = auth2.currentUser.get();
						handleSignIn(googleUser);
					}
				});
		});
	};

	useEffect(() => {
		initGoogleSignIn();
	}, []);

	const handleSignInClick = () => {
		const auth2 = window.gapi.auth2.getAuthInstance();
		auth2.signIn().then((googleUser) => {
			handleSignIn(googleUser);
		});
	};

	const handleSignOutClick = () => {
		handleSignOut();
	};

	return (
		<div>
			{isLoggedIn ? (
				<div className="p-2 bg-white rounded-xl flex flex-row justify-between items-center w-[200px] h-[35px]">
					<div className="w-[170px] flex justify-start gap-x-3">
						<img src={userInfo.imageUrl} className="w-[20px] h-[20px]" alt="User Profile" />
						<p className="text-bold">{userInfo.name}</p>
					</div>
					<button onClick={handleSignOutClick} className="text-white bg-red-900 text-sm p-1 rounded-xl text-bold">
						Logout
					</button>
				</div>
			) : (
				<button onClick={handleSignInClick} className="text-white bg-blue-500 text-sm p-2 rounded-xl text-bold">
					Accedi con Google
				</button>
			)}

			<script src="https://apis.google.com/js/platform.js" async defer></script>
			<script dangerouslySetInnerHTML={{ __html: 'initGoogleSignIn();' }} />
		</div>
	);
}

export default Login;
