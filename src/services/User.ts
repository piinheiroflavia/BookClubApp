// import { onAuthStateChanged } from "firebase/auth";
// import { auth, saveBookIdToLibrary, getUserLibraryBookIds } from "./firebaseConf";
// import { fetchBooksByGenre, getBooksByCategory, fetchBookById, getBookDetails } from "./apiBooks";

// onAuthStateChanged(auth, async (user) => {
//     if (user) {
//         const googleBookId = "BOOK_ID"; // ID do livro que você quer adicionar
//         await saveBookIdToLibrary(user.uid, googleBookId);

//         const userLibraryBookIds = await getUserLibraryBookIds(user.uid);
//         const userLibraryBooks = await Promise.all(userLibraryBookIds.map(id => fetchBookById(id)));
//         console.log("Biblioteca do usuário:", userLibraryBooks);
//     } else {
//         console.log("Usuário não autenticado.");
//     }
// });