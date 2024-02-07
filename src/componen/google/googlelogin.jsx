import { useState, useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { jwtDecode } from 'jwt-decode';

function Login() {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const auth = getAuth();
	const provider = new GoogleAuthProvider();

	useEffect(() => {
		const savedLogin = localStorage.getItem('isLoggedIn');
		if (savedLogin) {
			setLoggedIn(JSON.parse(savedLogin));
		}

		const savedUserInfo = localStorage.getItem('userInfo');
		if (savedUserInfo) {
			setUserInfo(JSON.parse(savedUserInfo));
		}
	}, []);

	const handleLoginSuccess = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			const deco = jwtDecode(result.credential);
			console.log('Login success:', deco);

			setUserInfo({
				name: deco.name,
				imageUrl: deco.picture,
			});

			setLoggedIn(true);
			localStorage.setItem('isLoggedIn', JSON.stringify(true));
			localStorage.setItem(
				'userInfo',
				JSON.stringify({
					name: deco.name,
					imageUrl: deco.picture,
				})
			);
			location.reload();
		} catch (error) {
			console.log('Login error:', error);
		}
	};

	const handleLogout = async () => {
		try {
			console.log('Logout');
			await signOut(auth);
			setLoggedIn(false);
			localStorage.setItem('isLoggedIn', JSON.stringify(false));
			localStorage.removeItem('userInfo');
			location.reload();
		} catch (error) {
			console.error('Logout error:', error);
		}
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
				<button
					onClick={handleLoginSuccess}
					className="text-white bg-blue-500 hover:bg-blue-700 text-sm p-2 rounded-xl text-bold"
				>
					Accedi con Google
				</button>
			)}
		</div>
	);
}

export default Login;
