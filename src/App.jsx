import '/src/App.css';
import { useState, useEffect } from 'react';
import tema from './tema/theme.mp3';
import Header from './componen/header/header';
import Body from './componen/body/body';

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
