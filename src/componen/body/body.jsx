import React, { useState, useEffect } from 'react';
import sfondo from '/src/img/sfondo2.jpg';
import video from '/src/img/videotest.mp4';

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
			<div className="bg-black bg-opacity-95 rounded-xl absolute top-[200px] w-[95%] h-fit gap-y-10 p-4 md:w-[85%] grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 justify-items-center items-center transition-all duration-500  ">
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

				<div className=" bg-slate-900 cursor-pointer  w-[95%] rounded-xl h-fit transition-all duration-500">
					<div className="flex flex-col justify-start p-2 md:p-3 gap-y-3 items-center">
						<p className="text-teal-400 font-bold text-start relative ">{userInfo.name}</p>
						<p className="text-white font-bold text-start relative text-sm md:text-base  w-[90%]">
							Bello sto sito ci sto perdendo le oreeee hahahhaah
						</p>
						<div className="text-violet-600 font-bold text-sm md:text-base w-full flex justify-between p-2 items-center">
							<button className="hover:text-teal-400">Like 23</button>
							<button className="hover:text-teal-400">Comments 14</button>
						</div>
					</div>
				</div>
				<div className=" bg-slate-900 cursor-pointer  w-[95%] rounded-xl h-fit transition-all duration-500">
					<div className="w-full h-full overflow-hidden">
						<video src={video} controls className="object-cover h-[350px] rounded-xl " />
					</div>
					<div className="flex flex-col justify-start p-2 md:p-3 gap-y-3 items-center">
						<p className="text-teal-400 font-bold text-start relative ">{userInfo.name}</p>
						<p className="text-white font-bold text-start relative text-sm md:text-base  w-[90%]">Welcome To The DCC</p>
					</div>
					<div className="text-violet-600 font-bold text-sm md:text-base w-full flex justify-between p-2 items-center">
						<button className="hover:text-teal-400">Like 123</button>
						<button className="hover:text-teal-400">Comments 5430</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default boody;
