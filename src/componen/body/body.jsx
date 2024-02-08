import React, { useState, useEffect, useRef } from 'react';
import sfondo from '/src/img/80.jpg';
import add from '/src/img/add.png';
import like from '/src/img/heart.png';
import console from '/src/img/console.png';
import Footer from '/src/componen/footer/footer';
import imageConversion from 'image-conversion';
import {
	getFirestore,
	collection,
	onSnapshot,
	addDoc,
	serverTimestamp,
	query,
	orderBy,
	updateDoc,
	doc,
} from 'firebase/firestore';

const boody = ({ firebaseApp }) => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [count, setCount] = useState(0);
	const [liked, setLiked] = useState(false);
	const [posta, setPosta] = useState(false);
	const [postit, setPostit] = useState(true);
	const [userInfo, setUserInfo] = useState({});
	const [timeh, setTim] = useState(new Date());
	const [selectedFile, setSelectedFile] = useState(null);
	const fileInput = useRef(null);
	const [feed, setFeed] = useState([]);
	const [post, setPost] = useState({
		image: null,
		descr: '',
		likes: 0,
		comments: 0,
	});

	useEffect(() => {
		const newTime = setInterval(() => {
			setTim(new Date());
		}, 1000);
		return () => clearInterval(newTime);
	});

	const db = getFirestore(firebaseApp);

	useEffect(() => {
		const q = query(collection(db, 'posts'), orderBy('tim', 'desc'));

		const unsubscribe = onSnapshot(q, (snapshot) => {
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

	const cambiaFile = async (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);

		if (file) {
			const reader = new FileReader();

			reader.onload = async (e) => {
				const img = new Image();
				img.src = e.target.result;

				img.onload = function () {
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d');

					// Ridimensiona l'immagine a una dimensione desiderata (ad esempio, 800x600)
					const maxWidth = 1200;
					const maxHeight = 720;
					let width = img.width;
					let height = img.height;

					if (width > height) {
						if (width > maxWidth) {
							height *= maxWidth / width;
							width = maxWidth;
						}
					} else {
						if (height > maxHeight) {
							width *= maxHeight / height;
							height = maxHeight;
						}
					}

					canvas.width = width;
					canvas.height = height;

					ctx.drawImage(img, 0, 0, width, height);
					const base64Image = canvas.toDataURL(file.type, 0.9);
					if (base64Image.length <= 1048487) {
						// Aggiorna lo stato dell'immagine con il Base64
						setPost((prevPost) => ({
							...prevPost,
							image: base64Image,
						}));
						setPostit(false);
					} else {
						console.error("L'immagine ridimensionata è ancora troppo grande per essere salvata.");
					}
				};
			};

			reader.readAsDataURL(file);
		} else {
			setPostit(true);
		}
	};

	const scriviDesc = (event) => {
		const newDescr = event.target.value;
		setPost((prevPost) => ({
			...prevPost,
			descr: newDescr,
		}));

		if (event.target.value !== '') {
			setPostit(false);
		} else {
			setPostit(true);
		}
	};

	const createPost = async () => {
		const newPost = {
			image: post.image,
			descr: post.descr,
			likes: 0,
			comments: 0,
			username: userInfo.name,
			imagepic: userInfo.imageUrl,
			tim: timeh,
			likedBy: [],
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

		location.reload();
		setPosta(false);
		setPostit(true);
	};

	const mettiLike = async (newPost) => {
		const updatedLikes = newPost.likes === 0 ? 1 : 0;
		setLiked(updatedLikes === 1 ? 0 : 1);
		newPost.likedBy = [...newPost.likedBy, userInfo.id];
		const postRef = doc(db, 'posts', newPost.id);
		await updateDoc(postRef, {
			likes: updatedLikes,
			timestamp: serverTimestamp(),
		});
	};

	return (
		<>
			<div
				className={`fixed top-0 bg-gradient-to-r from-violet-950 to-teal-950 justify-center flex overflow-hidden w-full h-full`}
			>
				<p className="text-white absolute text-5xl md:text-6xl font-bold top-[100px]"></p>
				<p className="text-white absolute text-lg md:text-xl top-[200px]"></p>
				<img src={sfondo} className="opacity-10 blur-[2px] object-cover md:scale-125 transition-all duration-500 eff" />
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
            animation: eff 5s infinite alternate-reverse;
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
					className={`bg-slate-900 rounded-xl border-2 border-black w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[50%] 2xl:w-[50%] transition-all duration-500 h-[630px] text-5xl flex justify-center text-white`}
				>
					<div className="w-full h-fit rounded-t-xl overflow-hidden">
						<img
							src={console}
							alt="Uploaded Image"
							className={`object-contain w-[100%] h-[350px] ${selectedFile ? 'hidden' : 'flex'}`}
						/>
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

					<div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[50%] 2xl:w-[50%] h-[170px] overflow-hidden absolute top-[58.5%] justify-center items-center transition-all duration-500">
						<textarea
							placeholder="Write a description"
							maxLength={500}
							value={post.descr}
							onChange={scriviDesc}
							className="outline-none resize-none rounded-xl text-white bg-black text-base w-[95%] h-[170px]  p-3"
						/>
					</div>

					<div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[50%] 2xl:w-[50%] h-[80px] overflow-hidden absolute bottom-[0%] rounded-b-xl bg-black justify-items-center grid grid-cols-3 items-center transition-all duration-500">
						<button
							onClick={apriFile}
							className="relative w-full scale-75 transition-all duration-500 text-2xl cursor-pointer hover:to-green-400 p-2 bg-gradient-to-t from-green-900 to-green-900 border-l-8 border-white rounded-r-md"
						>
							Choose media
							<input type="file" ref={fileInput} className="hidden" onChange={cambiaFile} />
						</button>
						<button
							disabled={postit}
							onClick={createPost}
							className={`relative w-full scale-75  transition-all duration-500 text-2xl cursor-pointer hover:to-violet-400 p-2 bg-gradient-to-t from-blue-900 to-violet-900 border-b-8 border-white rounded-t-md ${
								postit ? 'opacity-30' : 'opacity-100'
							}`}
						>
							Post it!
						</button>

						<button
							onClick={apriPost}
							className="relative w-full scale-75  transition-all duration-500 text-2xl cursor-pointer hover:to-red-400 p-2 bg-gradient-to-t from-red-900 to-red-900 border-r-8 border-white rounded-l-md"
						>
							Back
						</button>
					</div>
				</div>
				<div className="w-[100%] h-[70px] absolute bottom-[-80px] flex"></div>
			</div>

			<div
				className={`bg-slate-900 border-2 border-black bg-opacity-95 rounded-xl absolute w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[50%] h-[65px] gap-y-10 p-4 mb-4 justify-center items-center transition-all duration-500 ${
					isLoggedIn ? 'top-[280px]' : 'top-[110px]'
				} ${posta ? 'hidden' : 'flex'}`}
			>
				<input
					placeholder="Search something..."
					className="p-3 w-[50%] h-[50px] outline-none text-white bg-black rounded-xl"
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
				className={`bg-slate-900 border-2 border-black bg-opacity-95 rounded-xl absolute w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[50%] h-fit gap-y-10 p-4 grid-cols-1 justify-items-center items-start transition-all duration-500 ${
					isLoggedIn ? 'top-[350px]' : 'top-[180px]'
				} ${posta ? 'hidden' : 'grid'}`}
			>
				{feed.map((item, index) => (
					<div
						key={index}
						className="bg-gradient-to-r from-black to-black relative w-[100%] rounded-xl h-fit transition-all duration-500 eff2"
					>
						<style>
							{`
							.eff2{
							animation: 0.6s linear eff2
							}
							@keyframes eff2{
								from{opacity: 0.3; filter:blur(20px)}
								to{opacity: 1; filter:blur(0px)}
							}
							`}
						</style>
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
								<p className="hidden">{timeh.toLocaleTimeString()}</p>
							</div>
							<p className="text-white font-bold text-start relative text-sm md:text-base w-[95%] object-cover cursor-default">
								{item.descr}
							</p>
							<div className="text-white font-bold text-sm md:text-base w-full flex justify-between p-2 items-center">
								<button
									onClick={() => mettiLike(item)}
									className={`hover:to-blue-600 flex flex-row items-center bg-gradient-to-t  p-1 rounded-lg cursor-pointer ${
										item.likes ? 'from-green-700 to-green-700' : 'from-pink-700 to-pink-700'
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
				<div className="w-[100%] h-[70px] absolute bottom-[-100px] flex"></div>
			</div>
		</>
	);
};

export default boody;
