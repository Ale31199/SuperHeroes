import { GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';

function Login() {
	// Metodo 1: usando il componente GoogleLogin
	const handleSuccess = (response) => {
		console.log('Login success:', response);
	};

	const handleError = (error) => {
		console.log('Login error:', error);
	};

	return (
		<div>
			<GoogleLogin onSuccess={handleSuccess} onError={handleError} buttonText="Accedi con Google" />
		</div>
	);
}

export default Login;
