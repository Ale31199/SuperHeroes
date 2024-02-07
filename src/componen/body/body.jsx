import React, { useState, useEffect, useRef } from 'react';
import sfondo from '/src/img/neon.jpg';
import add from '/src/img/add.png';
import like from '/src/img/heart.png';
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';

const boody = ({ firebaseApp }) => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [count, setCount] = useState(0);
	const [liked, setLiked] = useState(false);
	const [posta, setPosta] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const [date, setDate] = useState(new Date());
	const [selectedFile, setSelectedFile] = useState(null);
	const fileInput = useRef(null);
	const [feed, setFeed] = useState([]);
	const [post, setPost] = useState({
		image: null,
		descr: '',
		likes: 0,
		comments: 0,
	});

	const db = getFirestore(firebaseApp);

	useEffect(() => {
		const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

		const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
			const nuoviPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			setFeed(nuoviPosts);
		});

		return () => unsubscribe();
	}, [db]);

	useEffect(() => {
		const savedLogin = localStorage.getItem('isLoggedIn');
		const savedUserInfo = localStorage.getItem('userInfo');

		if (savedLogin) {
			setLoggedIn(JSON.parse(savedLogin));
		}

		if (savedUserInfo) {
			setUserInfo(JSON.parse(savedUserInfo));
		}
	}, []);

	const apriPost = () => {
		if (!posta) {
			setPosta(true);
		} else {
			setPosta(false);
		}
	};

	const apriFile = () => {
		fileInput.current.click();
	};

	const cambiaFile = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);

		if (file) {
			setPost((prevPost) => ({
				...prevPost,
				image: URL.createObjectURL(file),
			}));
		}
	};

	const scriviDesc = (event) => {
		const newDescr = event.target.value;
		setPost((prevPost) => ({
			...prevPost,
			descr: newDescr,
		}));
	};

	const createPost = async () => {
		const newPost = {
			image: post.image,
			descr: post.descr,
			likes: 0,
			comments: 0,
			username: userInfo.name,
			imagepic: userInfo.imageUrl,
			tim: serverTimestamp(),
		};

		const docRef = await addDoc(collection(db, 'posts'), {
			...newPost,
			timestamp: serverTimestamp(),
		});

		setFeed((prevFeed) => [...prevFeed, { id: docRef.id, ...newPost }]);

		setPost({
			image: null,
			descr: '',
			likes: 0,
			comments: 0,
		});

		setPosta(false);
	};

	const mettiLike = (tasto) => {
		if (!liked) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	};

	return (
		<>
			<div className={`fixed top-0 bg-black justify-center flex overflow-hidden w-full h-full`}>
				<p className="text-white absolute text-5xl md:text-6xl font-bold top-[100px]"></p>
				<p className="text-white absolute text-lg md:text-xl top-[200px]"></p>
				<img src={sfondo} className="opacity-50 blur-[2px] object-cover md:scale-125 transition-all duration-500 eff" />
				<style>
					{`
          @keyframes eff {
            from {
              transform: scale(1.2);
            }
            to {
              transform: scale(1.3);
            }
          }

          .eff {
            animation: eff 10s infinite alternate-reverse;
          }
        `}
				</style>
			</div>

			{isLoggedIn && (
				<div
					className={`text-white flex-col w-[100%] absolute top-[130px] items-center justify-center text-3xl ${
						isLoggedIn ? 'flex' : 'hidden'
					} ${posta ? 'hidden' : 'flex'}`}
				>
					Buongiorno
					<div className="mt-3 flex flex-row items-center gap-x-3">
						<p className="text-teal-400 font-bold text-3xl md:text-5xl">{userInfo.name}</p>
					</div>
				</div>
			)}

			<div
				className={`w-[100%]  justify-center items-center absolute top-[180px] transition-all duration-500 ${
					posta ? 'flex' : 'hidden'
				}`}
			>
				<div
					className={`bg-slate-900 rounded-xl border-4 border-black w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] transition-all duration-500 h-[630px] text-5xl flex justify-center text-white`}
				>
					<div className="w-full h-fit rounded-t-xl overflow-hidden">
						{selectedFile && (
							<>
								{selectedFile.type.startsWith('image') ? (
									<img
										src={URL.createObjectURL(selectedFile)}
										alt="Uploaded Image"
										className="object-contain w-[100%] h-[350px]"
									/>
								) : selectedFile.type.startsWith('video') ? (
									<video controls width="300" height="200" className="w-full h-[350px] overflow-hidden rounded-xl">
										<source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
										<source src={URL.createObjectURL(selectedFile)} type="video/mov" />
										Your browser does not support the video tag.
									</video>
								) : null}
							</>
						)}
					</div>

					<div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] h-[170px] overflow-hidden absolute top-[58.5%] justify-center items-center transition-all duration-500">
						<textarea
							placeholder="Write a description"
							maxLength={500}
							value={post.descr}
							onChange={scriviDesc}
							className="outline-none resize-none rounded-xl text-white bg-black text-base w-[95%] h-[170px]  p-3"
						/>
					</div>

					<div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] h-[80px] overflow-hidden absolute bottom-[0%] rounded-b-xl bg-black justify-items-center grid grid-cols-3 items-center transition-all duration-500">
						<button
							onClick={apriFile}
							className="relative w-full scale-75 transition-all duration-500 text-2xl cursor-pointer hover:to-green-400 p-2 bg-gradient-to-t from-green-900 to-green-700 rounded-xl"
						>
							Choose media
							<input type="file" ref={fileInput} className="hidden" onChange={cambiaFile} />
						</button>
						<button
							onClick={createPost}
							className="relative w-full scale-75  transition-all duration-500 text-2xl cursor-pointer hover:to-violet-400 p-2 bg-gradient-to-t from-blue-900 to-violet-700 rounded-xl"
						>
							Post it!
						</button>

						<button
							onClick={apriPost}
							className="relative w-full scale-75  transition-all duration-500 text-2xl cursor-pointer hover:to-red-400 p-2 bg-gradient-to-t from-red-900 to-red-700 rounded-xl"
						>
							Back
						</button>
					</div>
				</div>
			</div>

			<div
				className={`bg-slate-900 border-2 border-slate-700 bg-opacity-95 rounded-xl absolute w-[95%] h-[65px] gap-y-10 p-4 mb-4 md:w-[85%] justify-center items-center transition-all duration-500 ${
					isLoggedIn ? 'top-[280px]' : 'top-[110px]'
				} ${posta ? 'hidden' : 'flex'}`}
			>
				<input
					placeholder="Search something..."
					className="p-3 w-[50%] h-[50px] outline-none text-white bg-slate-950 rounded-xl"
				/>
				<button
					disabled={!isLoggedIn}
					className={`flex-row w-[40%] items-center ${isLoggedIn ? 'flex' : 'hidden cursor-not-allowed '}`}
				>
					<div
						onClick={apriPost}
						className="absolute right-[5%] w-[130px] scale-75 md:scale-90 transition-all duration-500 flex flex-row items-center justify-center cursor-pointer hover:to-violet-400 p-2 bg-gradient-to-t from-blue-900 to-violet-700 rounded-xl"
					>
						<img src={add} className="w-[40px] h-[40px] invert" />
						<p className="text-white ml-2">Post</p>
					</div>
				</button>
			</div>

			<div
				className={`bg-slate-900 border-2 border-slate-700 bg-opacity-95 rounded-xl absolute w-[95%] h-fit gap-y-10 p-4 md:w-[85%] xl:grid-cols-3  md:grid-cols-2 grid-cols-1 justify-items-center items-start transition-all duration-500 ${
					isLoggedIn ? 'top-[350px]' : 'top-[180px]'
				} ${posta ? 'hidden' : 'grid'}`}
			>
				{feed.map((item, index) => (
					<div key={index} className="bg-black relative w-[95%] rounded-xl h-fit transition-all duration-500">
						<div
							className={`w-[100%] h-full overflow-hidden justify-center ${item.image === null ? 'hidden' : 'flex'}`}
						>
							<img
								src={item.image}
								className="object-cover w-[100%] h-[350px] rounded-t-xl cursor-pointer hover:scale-125 transition-all duration-500"
								alt="Uploaded Image"
							/>
						</div>

						<div className="flex flex-col justify-start p-2 md:p-3 gap-y-3 items-center overflow-hidden">
							<div className="flex flex-row gap-x-2 items-center p-2 w-[100%] justify-start">
								<img src={item.imagepic} className="w-[40px] h-[40px] rounded-full cursor-pointer" />
								<p className="text-teal-400 font-bold text-center relative text-lg md:text-xl cursor-pointer">
									{item.username}
								</p>
							</div>
							<p className="text-white font-bold text-start relative text-sm md:text-base w-[95%] object-cover cursor-default">
								{item.descr}
							</p>
							<div className="text-white font-bold text-sm md:text-base w-full flex justify-between p-2 items-center">
								<button
									onClick={mettiLike}
									className={`hover:to-blue-600 flex flex-row items-center bg-gradient-to-t  to-violet-600 p-1 rounded-lg cursor-pointer ${
										liked ? 'from-black border-2 border-white' : 'from-pink-900'
									}`}
								>
									<img src={like} className="w-[20px] h-[20px] invert mr-2 " />
									{item.likes}
								</button>
								<button className="hover:to-blue-600 bg-gradient-to-t from-teal-900 to-violet-600 p-1 rounded-lg cursor-pointer ">
									Comments {item.comments}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default boody;
