import '/src/App.css';
import { useState, useEffect } from 'react';
import tema from './tema/theme.mp3';
import Header from './componen/header/header';
import Body from './componen/body/body';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: 'AIzaSyC_bI0QmFFw_wctN0NatJcSpMRJ_km4qAo',
	authDomain: 'levelglitch-e8c9f.firebaseapp.com',
	projectId: 'levelglitch-e8c9f',
	storageBucket: 'levelglitch-e8c9f.appspot.com',
	messagingSenderId: '454462717026',
	appId: '1:454462717026:web:b78b76d42c0a5efc25253b',
	measurementId: 'G-4M2CX1HG2Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const App = () => {
	return (
		<>
			<div className="flex justify-center w-[100%] h-fit">
				<Body />
				<Header />
			</div>
		</>
	);
};

export default App;
