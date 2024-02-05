import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState({});

	useEffect(() => {
		// Recupera lo stato di accesso salvato nel localStorage durante il montaggio del componente
		const savedLogin = localStorage.getItem('isLoggedIn');
		if (savedLogin) {
			setLoggedIn(JSON.parse(savedLogin));
		}

		// Recupera le informazioni dell'utente dal localStorage
		const savedUserInfo = localStorage.getItem('userInfo');
		if (savedUserInfo) {
			setUserInfo(JSON.parse(savedUserInfo));
		}
	}, []);

	const handleLoginSuccess = (response) => {
		const deco = jwtDecode(response?.credential);
		console.log('Login success:', deco);

		// Imposta lo stato dell'utente con le nuove informazioni
		setUserInfo({
			name: deco.name,
			imageUrl: deco.picture,
		});

		// Aggiorna lo stato di accesso e salva nel localStorage
		setLoggedIn(true);
		localStorage.setItem('isLoggedIn', JSON.stringify(true));
		localStorage.setItem(
			'userInfo',
			JSON.stringify({
				name: deco.name,
				imageUrl: deco.picture,
			})
		);
	};

	const handleLoginError = (error) => {
		console.log('Login error:', error);
	};

	const handleLogout = () => {
		console.log('Logout');

		// Aggiorna lo stato di accesso e salva nel localStorage
		setLoggedIn(false);
		localStorage.setItem('isLoggedIn', JSON.stringify(false));
		localStorage.removeItem('userInfo');
	};

	return (
		<div>
			{isLoggedIn && (
				<div className="p-3 bg-slate-800 border-2 border-white rounded-xl flex flex-row justify-between items-center w-fit h-[45px]">
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
