import { getFirestore, collection, addDoc } from 'firebase/firestore';
// All'interno della funzione dove vuoi scrivere il post
const db = getFirestore(app); // 'app' è l'istanza di Firebase inizializzata in precedenza

const nuovoPost = {
	descr: 'La tua descrizione del post',
	image: "URL dell'immagine",
	likes: 0,
	comments: 0,
};

const postsCol = collection(db, 'posts');
addDoc(postsCol, nuovoPost);
