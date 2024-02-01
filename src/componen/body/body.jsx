import sfondo from '/src/img/sfondo2.jpg';
import { useState } from 'react';

const body = () => {
	return (
		<>
			<div className="fixed top-0 bg-black justify-center flex overflow-hidden w-full h-full ">
				<p className="text-white absolute text-5xl md:text-6xl font-bold top-[100px]">gfdg</p>
				<p className="text-white absolute text-lg md:text-xl top-[200px]">fd</p>
				<img src={sfondo} className="opacity-10 object-cover md:scale-125 transition-all duration-500 " />
			</div>

			<div className="bg-black relative top-[350px] w-[100%] grid xl:grid-cols-3 xl:grid-rows-2 md:grid-cols-2 md:grid-rows-3 grid-cols-1 grid-rows-6 justify-items-center items-center transition-all duration-500 md:h-[700px] md:hover:h-[1100px]  xl:h-[500px] xl:hover:h-[750px] h-[1500px] ">
				<div className=" bg-neutral-800 cursor-pointer  w-[95%] rounded-xl h-[200px] md:hover:h-[350px] transition-all duration-500"></div>

				<div className=" bg-neutral-800 cursor-pointer  w-[95%] rounded-xl h-[200px] md:hover:h-[350px] transition-all duration-500"></div>
				<div className=" bg-neutral-800 cursor-pointer  w-[95%] rounded-xl h-[200px] md:hover:h-[350px] transition-all duration-500"></div>

				<div className=" bg-neutral-800 cursor-pointer  w-[95%] rounded-xl h-[200px] md:hover:h-[350px] transition-all duration-500"></div>
				<div className=" bg-neutral-800 cursor-pointer  w-[95%] rounded-xl h-[200px] md:hover:h-[350px] transition-all duration-500"></div>

				<div className=" bg-neutral-800 cursor-pointer  w-[95%] rounded-xl h-[200px] md:hover:h-[350px] transition-all duration-500"></div>
			</div>
		</>
	);
};

export default body;
