import '/src/App.css';
import { useState } from 'react';
import ita from '/src/italiano.json';
import eng from '/src/inglese.json';
import hc from '/src/img/SuperHeroes.png';
import menu from '/src/img/pause.png';

const Header = () => {
	const [lang, setLang] = useState(eng);
	const [showmenu, setShowmenu] = useState(false);

	const cambiaLIngua = (lingua) => {
		switch (lingua) {
			case 'ita':
				setLang(ita);
				break;
			case 'eng':
				setLang(eng);
				break;
		}
	};

	const apriMenu = () => {
		if (!showmenu) {
			setShowmenu(true);
		} else {
			setShowmenu(false);
		}
	};

	return (
		<>
			<div className="flex absolute top-0 justify-between items-center w-[100%] h-[80px] bg-black text-white p-6">
				<img src={hc} className="w-[300px] h-[70px]" />
				<img
					src={menu}
					onClick={apriMenu}
					className={`w-[30px] invert transition-all duration-500 md:invisible cursor-pointer ${
						showmenu ? 'rotate-180' : 'rotate-90'
					}`}
				/>
			</div>

			<div
				className={` md:flex md:bg-black md:justify-center md:items-center md:flex-row md:gap-6 md:absolute md:right-10 md:top-0 md:w-auto md:h-[80px] md:visible
			${
				showmenu
					? 'flex bg-neutral-800 justify-center items-center flex-col gap-3 border-t-2 border-white absolute top-[80px] w-[100%] h-[200px] visible transition-all duration-500'
					: ' h-[0px] invisible absolute top-[80px] w-[100%]'
			}`}
			>
				<p className="text-white cursor-pointer hover:text-orange-400 font-bold">{lang.menu.home}</p>
				<p className="text-white cursor-pointer hover:text-orange-400 font-bold">{lang.menu.members}</p>
				<p className="text-white cursor-pointer hover:text-orange-400 font-bold">{lang.menu.text}</p>
				<select
					onChange={(e) => cambiaLIngua(e.target.value)}
					className="text-black outline-none rounded-md cursor-pointer"
				>
					<option value="eng">English</option>
					<option value="ita">Italiano</option>
				</select>
			</div>
		</>
	);
};

export default Header;
