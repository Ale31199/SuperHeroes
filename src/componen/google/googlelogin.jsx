import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState(null);

	const handleLoginSuccess = (response) => {
		const salvaLogin = localStorage.getItem('isLoggedIn');
		if (salvaLogin) {
			setLoggedIn(JSON.parse(salvaLogin));
		}
		const deco = jwtDecode(response?.credential);
		console.log('Login success:', deco);
		setLoggedIn(true);
		setLoggedIn(localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn)));

		// Accedi direttamente alle informazioni dell'utente dalla risposta
		setUserInfo({
			name: deco.name,
			imageUrl: deco.picture,
		});
	};

	const handleLoginError = (error) => {
		console.log('Login error:', error);
	};

	const handleLogout = () => {
		console.log('Logout');
		setLoggedIn(false);
		setLoggedIn(localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn)));
	};

	return (
		<div>
			{isLoggedIn && (
				<div className="p-2 bg-slate-800 border-2 border-white rounded-xl flex flex-row justify-between items-center w-fit h-[35px]">
					<div className="w-[170px] flex justify-start items-center gap-x-3">
						<img src={userInfo.imageUrl} className="w-[30px] h-[30px] rounded-full" alt="User Profile" />
						<p className="font-bold text-white text-sm text-center">{userInfo.name}</p>
					</div>
					<button
						onClick={handleLogout}
						className="text-white bg-red-900 hover:bg-orange-800 text-sm p-1 rounded-xl text-bold"
					>
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
