import React, { useState, useEffect } from 'react';
import sfondo from '/src/img/sfondo2.jpg';
import video from '/src/img/videotest.mp4';
import add from '/src/img/add.png';
import like from '/src/img/heart.png';
import comment from '/src/img/editing.png';

const boody = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState({});

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

	return (
		<>
			<div className="fixed top-0 bg-black justify-center flex overflow-hidden w-full h-full ">
				<p className="text-white absolute text-5xl md:text-6xl font-bold top-[100px]"></p>
				<p className="text-white absolute text-lg md:text-xl top-[200px]"></p>
				<img src={sfondo} className="opacity-30 blur-[2px] object-cover md:scale-125 transition-all duration-500 " />
			</div>

			{isLoggedIn && (
				<div
					className={`text-white flex-col w-[100%] flex absolute top-[130px] items-center justify-center text-5xl ${
						isLoggedIn ? 'visible' : 'invisible'
					}`}
				>
					Buongiorno
					<img src={userInfo.imageUrl} className="w-[40px] h-[40px] rounded-full ml-2 mt-3" />
					<p className="text-white font-bold text-sm md:text-base">{userInfo.name}</p>
				</div>
			)}

			{!isLoggedIn && (
				<div
					className={`bg-slate-900 bg-opacity-95 rounded-xl absolute w-[95%] h-[65px] gap-y-10 p-4 md:w-[85%] flex justify-center items-center transition-all duration-500 ${
						isLoggedIn ? 'top-[280px]' : 'top-[110px]'
					}`}
				>
					<input
						placeholder="Search something..."
						className="p-3 w-[50%] h-[50px] outline-none text-white bg-neutral-800 rounded-xl"
					/>
					<button
						disabled={!isLoggedIn}
						className={`flex flex-row w-[40%] items-center ${
							isLoggedIn ? 'opacity-100' : 'opacity-35 cursor-not-allowed '
						}`}
					>
						<div className="absolute right-[5%] w-[130px] scale-75 md:scale-90 transition-all duration-500 flex flex-row items-center justify-center cursor-pointer hover:to-orange-400 p-2 bg-gradient-to-t from-red-900 to-orange-700 rounded-xl">
							<img src={add} className="w-[40px] h-[40px] invert" />
							<p className="text-white ml-2">Post</p>
						</div>
					</button>
				</div>
			)}

			{!isLoggedIn && (
				<div
					className={`bg-black bg-opacity-95 rounded-xl absolute w-[95%] h-fit gap-y-10 p-4 md:w-[85%] grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 justify-items-center items-center transition-all duration-500 ${
						isLoggedIn ? 'top-[350px]' : 'top-[180px]'
					}`}
				>
					<div className=" bg-slate-900 cursor-pointer relative w-[95%] rounded-xl h-fit transition-all duration-500">
						<div className="w-[100%] h-full overflow-hidden justify-center">
							<img
								src={sfondo}
								className="object-cover w-[100%] h-[350px] rounded-xl hover:scale-125 transition-all duration-500"
							/>
						</div>
						<div className="flex flex-col justify-start p-2 md:p-3 gap-y-3 items-center">
							<p className="text-teal-400 font-bold text-start relative ">{userInfo.name}</p>
							<p className="text-white font-bold text-start relative text-sm md:text-base  w-[90%]">
								I supereroi sono fichissimi guardate! Ho fatto questa fan art per tutti voi spero vi piaccia!
							</p>
							<div className="text-violet-600 font-bold text-sm md:text-base w-full flex justify-between p-2 items-center">
								<button className="hover:text-teal-400">Like 12</button>
								<button className="hover:text-teal-400">Comments 345</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default boody;
