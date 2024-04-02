import '/src/App.css';
import { useState } from 'react';
import ita from '/src/italiano.json';
import eng from '/src/inglese.json';
import hc from '/src/img/Occulta.png';
import menu from '/src/img/pause.png';
import Login from '/src/componen/google/googlelogin.jsx';

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
				<div className="flex flex-row gap-x-1 items-center cursor-default">
					<img src={hc} className="w-[70px] h-[50px]" />
					<p className="text-white text-5xl">OccultaVox</p>
				</div>
				<img
					src={menu}
					onClick={apriMenu}
					className={`w-[30px] invert transition-all duration-500 xl:invisible cursor-pointer ${
						showmenu ? 'rotate-180' : 'rotate-90'
					}`}
				/>
			</div>

			<div
				className={` xl:flex xl:bg-black xl:justify-center xl:items-center xl:flex-row xl:gap-6 xl:absolute xl:right-10 xl:top-0 xl:w-auto xl:h-[80px] xl:border-0 xl:visible
			${
				showmenu
					? 'flex bg-slate-950 justify-center items-center flex-col gap-3 gap-y-6 border-t-2 border-white absolute top-[80px] w-[100%] h-[350px] visible transition-all duration-500'
					: ' h-[0px] invisible absolute top-[80px] w-[100%] '
			}`}
			>
				<p className="text-white cursor-pointer hover:text-violet-400 font-bold">{lang.menu.home}</p>
				<p className="text-white cursor-pointer hover:text-violet-400 font-bold">{lang.menu.profile}</p>
				<p className="text-white cursor-pointer hover:text-violet-400 font-bold">{lang.menu.members}</p>
				<p className="text-white cursor-pointer hover:text-violet-400 font-bold">{lang.menu.text}</p>
				<Login />
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
