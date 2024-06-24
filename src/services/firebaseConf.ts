import firebase from "firebase/app"; 
import "firebase/auth";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc, deleteDoc, getDocs, getDoc, query, where } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC3Mr8JcBH0MG8tBr3yeoDdbOEHm7Tc9IE",
    authDomain: "bookapp-b9d35.firebaseapp.com",
    projectId: "bookapp-b9d35",
    storageBucket: "bookapp-b9d35.appspot.com",
    messagingSenderId: "417506285688",
    appId: "1:417506285688:web:5ad75996969e5c62f2f58d",
    measurementId: "G-WWKSL24THY"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
export async function loginUser(email: string, password: string) {
   // const email = `${username}@codedam.com`;
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log('Resposta do Firebase Auth:', res);
        return true;
    } catch (error) {
       //console.error('Erro ao tentar logar:', error);
        return false;
    }
}

export async function registrerUser(email: string, password: string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log(res);
        return true;
    } catch (error) {   
       //console.error('Erro ao tentar logar:', error);
        return false;
    }
}

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
};
// Funções para Gerenciamento da Biblioteca Perfil
// Salva livro no meus favoritos Firestore
export async function saveBookIdToLibrary(userId: string, googleBookId: string) {
    try {
       
        const bookData = {
            googleBookId,
            dateAdded: new Date()
           
        };
        await setDoc(doc(db, "libraries", userId, "books", googleBookId), bookData);
        console.log("ID do livro salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar ID do livro:", error);
    }
}

// Salva os lidos
export async function saveBookIdToLibraryRead(userId: string, googleBookId: string) {
    try {
        const bookData = {
            googleBookId: googleBookId,
            dateAdded: new Date()
        };
        await setDoc(doc(db, "livrariaUsuario", userId, "booksRead", googleBookId), bookData);
        console.log("ID do livro salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar ID do livro:", error);
    }
}

// Salva os que quero ler
export async function saveBookIdToLibraryIWantToRead(userId: string, googleBookId: string) {
    try {
        const bookData = {
            googleBookId: googleBookId,
            dateAdded: new Date()
        };
        await setDoc(doc(db, "livrariaUsuario", userId, "booksIWantToRead", googleBookId), bookData);
        console.log("ID do livro salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar ID do livro:", error);
    }
}
// Salva os em leitura
export async function saveBookIdToLibraryInReading(userId: string, googleBookId: string) {
    try {
        const bookData = {
            googleBookId: googleBookId,
            dateAdded: new Date()
        };
        await setDoc(doc(db, "livrariaUsuario", userId, "booksInReading", googleBookId), bookData);
        console.log("ID do livro salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar ID do livro:", error);
    }
}
// Salva os em leitura interrompida
export async function saveBookIdToLibraryLeftAside(userId: string, googleBookId: string) {
    try {
        const bookData = {
            googleBookId: googleBookId,
            dateAdded: new Date()
        };
        await setDoc(doc(db, "livrariaUsuario", userId, "booksLeftAside", googleBookId), bookData);
        console.log("ID do livro salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar ID do livro:", error);
    }
}

// Obter livros favoritos
export const getUserBooks = async (userId: string) => {
    const userBooksRef = collection(db, 'livrariaUsuario', userId, 'books');
    const q = query(userBooksRef);

    const querySnapshot = await getDocs(q);
    const books: any[] = [];
    querySnapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
    });

    return books;
};

// Obter livros lidos
export const getUserReadBooks = async (userId: string) => {
    const userBooksRef = collection(db, 'livrariaUsuario', userId, 'booksRead');
    const q = query(userBooksRef);

    const querySnapshot = await getDocs(q);
    const books: any[] = [];
    querySnapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
    });

    return books;
};

// Obter livros que quero ler
export const getUserBooksIWantToRead = async (userId: string) => {
    const userBooksRef = collection(db, 'livrariaUsuario', userId, 'booksIWantToRead');
    const q = query(userBooksRef);

    const querySnapshot = await getDocs(q);
    const books: any[] = [];
    querySnapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
    });

    return books;
};
// Obter livros em leitura
export const getUserBooksInReading = async (userId: string) => {
    const userBooksRef = collection(db, 'livrariaUsuario', userId, 'booksInReading');
    const q = query(userBooksRef);

    const querySnapshot = await getDocs(q);
    const books: any[] = [];
    querySnapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
    });

    return books;
};
// Obter livros abandonados
export const getUserBooksLeftAside = async (userId: string) => {
    const userBooksRef = collection(db, 'livrariaUsuario', userId, 'booksLeftAside');
    const q = query(userBooksRef);

    const querySnapshot = await getDocs(q);
    const books: any[] = [];
    querySnapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
    });

    return books;
};
// Favorito
export const addBookToLibrary = async (userId: string, bookId: string) => {
    const userBooksRef = collection(db, 'livrariaUsuario', userId, 'books');

    try {
        const bookRef = doc(userBooksRef, bookId);
        const bookDoc = await getDoc(bookRef);
        if (bookDoc.exists()) {
            throw new Error('Livro já está na biblioteca do usuário.');
        }

        await setDoc(bookRef, { googleBookId: bookId });
        console.log("Livro adicionado à biblioteca com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar livro à biblioteca:", error);
        throw error;
    }
};

// Já lido
export const addBookToLibraryRead = async (userId: string, bookId: string) => {
    const userBooksRef = collection(db, 'livrariaUsuario', userId, 'booksRead');

    try {
        const bookRef = doc(userBooksRef, bookId);
        const bookDoc = await getDoc(bookRef);
        if (bookDoc.exists()) {
            throw new Error('Livro já está na biblioteca do usuário.');
        }

        await setDoc(bookRef, { googleBookId: bookId });
        console.log("Livro adicionado à biblioteca com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar livro à biblioteca:", error);
        throw error;
    }
};

// Quero ler
export const addBookToLibraryIWantToRead = async (userId: string, bookId: string) => {
    const userBooksRef = collection(db, 'livrariaUsuario', userId, 'booksIWantToRead');

    try {
        const bookRef = doc(userBooksRef, bookId);
        const bookDoc = await getDoc(bookRef);
        if (bookDoc.exists()) {
            throw new Error('Livro já está na biblioteca do usuário.');
        }

        await setDoc(bookRef, { googleBookId: bookId });
        console.log("Livro adicionado à biblioteca com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar livro à biblioteca:", error);
        throw error;
    }
};

// em leitura
export const addBookToLibraryInReading = async (userId: string, bookId: string) => {
    const userBooksRef = collection(db, 'livrariaUsuario', userId, 'booksInReading');

    try {
        const bookRef = doc(userBooksRef, bookId);
        const bookDoc = await getDoc(bookRef);
        if (bookDoc.exists()) {
            throw new Error('Livro já está na biblioteca do usuário.');
        }

        await setDoc(bookRef, { googleBookId: bookId });
        console.log("Livro adicionado à biblioteca com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar livro à biblioteca:", error);
        throw error;
    }
};
// abandonados
export const addBookToLibraryLeftAside = async (userId: string, bookId: string) => {
    const userBooksRef = collection(db, 'livrariaUsuario', userId, 'booksLeftAside');

    try {
        const bookRef = doc(userBooksRef, bookId);
        const bookDoc = await getDoc(bookRef);
        if (bookDoc.exists()) {
            throw new Error('Livro já está na biblioteca do usuário.');
        }

        await setDoc(bookRef, { googleBookId: bookId });
        console.log("Livro adicionado à biblioteca com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar livro à biblioteca:", error);
        throw error;
    }
};

// Função para excluir um livro dos favoritos
export const removeBookFromLibrary = async (userId: string, bookId: string) => {
    const bookRef = doc(db, 'livrariaUsuario', userId, 'books', bookId);

    try {
        await deleteDoc(bookRef);
        console.log("Livro removido da biblioteca com sucesso!");
    } catch (error) {
        console.error("Erro ao remover livro da biblioteca:", error);
        throw error;
    }
};

// Função para excluir um livro dos lidos
export const removeBookFromLibraryRead = async (userId: string, bookId: string) => {
    const bookRef = doc(db, 'livrariaUsuario', userId, 'booksRead', bookId);

    try {
        await deleteDoc(bookRef);
        console.log("Livro removido dos livros lidos com sucesso!");
    } catch (error) {
        console.error("Erro ao remover livro dos livros lidos:", error);
        throw error;
    }
};

// Função para excluir um livro dos que quero ler
export const removeBookFromLibraryIWantToRead = async (userId: string, bookId: string) => {
    const bookRef = doc(db, 'livrariaUsuario', userId, 'booksIWantToRead', bookId);

    try {
        await deleteDoc(bookRef);
        console.log("Livro removido dos livros que quero ler com sucesso!");
    } catch (error) {
        console.error("Erro ao remover livro dos livros que quero ler:", error);
        throw error;
    }
};

// Função para excluir um livro dos que quero ler
export const removeBookFromLibraryInReading = async (userId: string, bookId: string) => {
    const bookRef = doc(db, 'livrariaUsuario', userId, 'booksInReading', bookId);

    try {
        await deleteDoc(bookRef);
        console.log("Livro removido dos livros que quero ler com sucesso!");
    } catch (error) {
        console.error("Erro ao remover livro dos livros que quero ler:", error);
        throw error;
    }
};

// Função para excluir um livro dos que quero ler
export const removeBookFromLibraryLeftAside = async (userId: string, bookId: string) => {
    const bookRef = doc(db, 'livrariaUsuario', userId, 'booksLeftAside', bookId);

    try {
        await deleteDoc(bookRef);
        console.log("Livro removido dos livros que quero ler com sucesso!");
    } catch (error) {
        console.error("Erro ao remover livro dos livros que quero ler:", error);
        throw error;
    }
};
