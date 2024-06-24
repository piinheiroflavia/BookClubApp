import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonButton, IonGrid, IonRow, IonCol, IonAlert } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { book, exitOutline, informationCircle, trashBinOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { initAuth } from '../../../services/useAuth';
import {
  getUserBooks,
  getUserReadBooks,
  getUserBooksIWantToRead,
  //getUserBooksLeftAside,
 //getUserBooksInReading,
  removeBookFromLibrary,
  removeBookFromLibraryRead,
  removeBookFromLibraryIWantToRead,
//  removeBookFromLibraryInReading,
  //removeBookFromLibraryLeftAside
} from '../../../services/firebaseConf';
import '../../../style.css';
import { fetchBookById } from '../../../services/apiBooks';

interface Book {
  id: string;
  googleBookId: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    pageCount: number;
    description: string;
    categories: string[];
    publisher: string;
    averageRating: number;
    imageLinks: {
      thumbnail: string;
    };
  };
}

const fetchUserBooksDetails = async (userId: string, getBooksFunction: (userId: string) => Promise<any[]>) => {
  try {
    const userBooks = await getBooksFunction(userId);
    console.log(`Livros do usuário (categoria ${getBooksFunction.name}):`, userBooks);

    const bookDetailsPromises = userBooks.map(async (bookId) => {
      const bookDetail = await fetchBookById(bookId.googleBookId);
      return bookDetail;
    });

    const userBooksDetails = await Promise.all(bookDetailsPromises);
    console.log(`Detalhes de todos os livros do usuário (categoria ${getBooksFunction.name}):`, userBooksDetails);

    return userBooksDetails.filter((book) => book !== null) as Book[];
  } catch (error) {
    console.error(`Erro ao buscar livros do usuário (categoria ${getBooksFunction.name}):`, error);
    return [];
  }
};

const Perfil: React.FC = () => {
  const history = useHistory();
  const { user, status } = initAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [bookRead, setBooksRead] = useState<Book[]>([]);
  const [bookIWantRead, setIWantRead] = useState<Book[]>([]);
  const [bookInReading, setInReading] = useState<Book[]>([]);
  const [bookLeftAside, setLeftAside] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedBook, setSelectedBook] = useState<{ id: string; listType: string } | null>(null);

  useEffect(() => {
    if (!status && !user) {
      console.log('Usuário não está logado, redirecionando para a página de login...');
      history.push('/login');
    } else if (user) {
      console.log("Usuário autenticado:", user.uid);
    }
  }, [status, user, history]);

  useEffect(() => {
    if (user) {
      const fetchBooks = async () => {
        setLoading(true);

        const userBooks = await fetchUserBooksDetails(user.uid, getUserBooks);
        console.log("Detalhes dos livros favoritos:", userBooks);
        setBooks(userBooks);

        const userReadBooks = await fetchUserBooksDetails(user.uid, getUserReadBooks);
        console.log("Detalhes dos livros lidos:", userReadBooks);
        setBooksRead(userReadBooks);

        const userBooksIWantToRead = await fetchUserBooksDetails(user.uid, getUserBooksIWantToRead);
        console.log("Detalhes dos livros que quero ler:", userBooksIWantToRead);
        setIWantRead(userBooksIWantToRead);

        // const userBooksInReading = await fetchUserBooksDetails(user.uid, getUserBooksInReading);
        // console.log("Detalhes dos livros em andamento:", userBooksInReading);
        // setInReading(userBooksInReading);

        // const userBooksLeftAside = await fetchUserBooksDetails(user.uid, getUserBooksLeftAside);
        // console.log("Detalhes dos livros abandonados:", userBooksLeftAside);
        // setLeftAside(userBooksLeftAside);

        setLoading(false);
      };
      fetchBooks();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleRemoveBook = async () => {
    if (!selectedBook) return;
    const { id, listType } = selectedBook;
  
    try {
      if (listType === 'favorites') {
        await removeBookFromLibrary(user!.uid, id);
        setBooks(books.filter(book => book.id !== id));
      } else if (listType === 'read') {
        await removeBookFromLibraryRead(user!.uid, id);
        setBooksRead(bookRead.filter(book => book.id !== id));
      } else if (listType === 'wantToRead') {
        await removeBookFromLibraryIWantToRead(user!.uid, id);
        setIWantRead(bookIWantRead.filter(book => book.id !== id));
      // } else if (listType === 'inReading') {
      //   await removeBookFromLibraryInReading(user!.uid, id);
      //   setInReading(bookInReading.filter(book => book.id !== id));
      // } else if (listType === 'leftAside') {
      //   await removeBookFromLibraryLeftAside(user!.uid, id);
      //   setLeftAside(bookLeftAside.filter(book => book.id !== id));
      }
    } catch (error) {
      console.error('Erro ao remover livro:', error);
    } finally {
      setShowAlert(false);
      setSelectedBook(null);
    }
  };
  
  const handleBookClick = (id: string) => {
    history.push(`/livro/${id}`);
  };

  const handleButtonClickInfo = () => {
    history.push('/sobreNos');
  };

  const confirmRemoveBook = (id: string, listType: string) => {
    setSelectedBook({ id, listType });
    setShowAlert(true);
  };

  const handleButtonClick = () => {
    history.push('/login');
  };

  return (
    <IonContent fullscreen className="container">
      <IonHeader>
        <IonToolbar>
          <IonIcon icon={informationCircle} onClick={handleButtonClickInfo} className='text-2xl mt-2 m-3 text-tom-tomRosaEscuro font-bold border-none p-0 absolute top-0' />
          <IonIcon icon={exitOutline} onClick={handleButtonClick} className='text-2xl m-3 bg-none border-none p-0 absolute top-0 right-0 text-tom-tomRosaEscuro' />
        </IonToolbar>
        <IonRow>
          <IonToolbar color="tertiary" style={{ padding: '15px 0px', boxShadow: 'none' }}>
            <IonRow>
              <IonTitle className='mt-6 text-2xl text-center font-bold ' size="large">Minha Biblioteca</IonTitle>
            </IonRow>
            <IonRow>
              <IonTitle className='mb-6  text-white  flex  text-center ' size="small">A leitura é uma forma de me tornar melhor</IonTitle>
            </IonRow>
          </IonToolbar>
        </IonRow>
      </IonHeader>

      <IonGrid id="bloco2">
        {/* <IonRow className='mt-6'>
          <IonTitle id="tituloGeneros" size="small" className='font-bold'>Meus Favoritos</IonTitle>
        </IonRow>
        <IonRow>
          {books.length === 0 ? (
            <IonCol className="text-center">Você não possui livros favoritos.</IonCol>
          ) : (
            <Swiper
              autoplay={true}
              keyboard={true}
              pagination={true}
              scrollbar={true}
              zoom={true}
              slidesPerView={4}
              loop={true}
              className="grid grid-cols-4 gap-4"
            >
              {books.map((book: Book) => (
                <SwiperSlide key={book.id} className="w-full mr-2">
                  <IonCol>
                    <IonRow className="h-full flex justify-center items-center">
                      <img
                        src={book.volumeInfo.imageLinks?.thumbnail}
                        alt={book.volumeInfo.title}
                        onClick={() => handleBookClick(book.id)}
                        className="max-w-full max-h-full object-cover"
                      />
                    </IonRow>
                    <IonRow className="h-full flex justify-center items-center "><br />
                      <IonIcon icon={trashBinOutline} color="danger" className='text-2xl mt-6 bg-none border-none absolute text-white' onClick={() => confirmRemoveBook(book.id, 'favorites')} />
                      <br /><br />
                    </IonRow>
                  </IonCol>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </IonRow> */}

        <IonRow className='mt-6'>
          <IonTitle id="tituloGeneros" size="small" className='font-bold'>Livros Em leitura</IonTitle>
        </IonRow>
        <IonRow>
          {bookRead.length === 0 ? (
            <IonCol className="text-center">Você não possui livros em leitura.</IonCol>
          ) : (
            <Swiper
              autoplay={true}
              keyboard={true}
              pagination={true}
              scrollbar={true}
              zoom={true}
              slidesPerView={3}
              loop={true}
              className="grid grid-cols-4 gap-4"
            >
              {bookRead.map((book: Book) => (
                <SwiperSlide key={book.id} className="w-full mr-2">
                  <IonCol>
                    <IonRow className="h-full flex justify-center items-center">
                      <img
                        //src={book.volumeInfo.imageLinks?.thumbnail}
                        src={`https://books.google.com/books/publisher/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
                        alt={book.volumeInfo.title}
                        onClick={() => handleBookClick(book.id)}
                        className="max-w-full max-h-full object-cover"
                      />
                    </IonRow>
                    <IonRow className="h-full flex justify-center items-center "><br />
                      <IonIcon icon={trashBinOutline} color="danger" className='text-2xl mt-6 bg-none border-none absolute text-white' onClick={() => confirmRemoveBook(book.id, 'read')} />
                      <br /><br />
                    </IonRow>
                  </IonCol>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </IonRow>

        <IonRow className='mt-6'>
          <IonTitle id="tituloGeneros" size="small" className='font-bold'>Livros Finalizados</IonTitle>
        </IonRow>
        <IonRow>
          {bookIWantRead.length === 0 ? (
            <IonCol className="text-center">Você não possui livros na lista Finalizados.</IonCol>
          ) : (
            <Swiper
              autoplay={true}
              keyboard={true}
              pagination={true}
              scrollbar={true}
              zoom={true}
              slidesPerView={3}
              loop={true}
              className="grid grid-cols-4 gap-4"
            >
              {bookIWantRead.map((book: Book) => (
                <SwiperSlide key={book.id} className="w-full mr-2">
                  <IonCol>
                    <IonRow className="h-full flex justify-center items-center">
                      <img
                        //src={book.volumeInfo.imageLinks?.thumbnail}
                        src={`https://books.google.com/books/publisher/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
                        alt={book.volumeInfo.title}
                        onClick={() => handleBookClick(book.id)}
                        className="max-w-full max-h-full object-cover"
                      />
                    </IonRow>
                    <IonRow className="h-full flex justify-center items-center "><br />
                      <IonIcon icon={trashBinOutline} color="danger" className='text-2xl mt-6 bg-none border-none absolute text-white' onClick={() => confirmRemoveBook(book.id, 'wantToRead')} />
                      <br /><br />
                    </IonRow>
                  </IonCol>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </IonRow>

        {/* <IonRow className='mt-6'>
          <IonTitle id="tituloGeneros" size="small" className='font-bold'>Em Leitura</IonTitle>
        </IonRow>
        <IonRow>
          {bookInReading.length === 0 ? (
            <IonCol className="text-center">Você não possui livros em leitura.</IonCol>
          ) : (
            <Swiper
              autoplay={true}
              keyboard={true}
              pagination={true}
              scrollbar={true}
              zoom={true}
              slidesPerView={4}
              loop={true}
              className="grid grid-cols-4 gap-4"
            >
              {bookInReading.map((book: Book) => (
                <SwiperSlide key={book.id} className="w-full mr-2">
                  <IonCol>
                    <IonRow className="h-full flex justify-center items-center">
                      <img
                        src={book.volumeInfo.imageLinks?.thumbnail}
                        alt={book.volumeInfo.title}
                        onClick={() => handleBookClick(book.id)}
                        className="max-w-full max-h-full object-cover"
                      />
                    </IonRow>
                    <IonRow className="h-full flex justify-center items-center "><br />
                      <IonIcon icon={trashBinOutline} color="danger" className='text-2xl mt-6 bg-none border-none absolute text-white' onClick={() => confirmRemoveBook(book.id, 'inReading')} />
                      <br /><br />
                    </IonRow>
                  </IonCol>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </IonRow> */}

        {/* <IonRow className='mt-6'>
          <IonTitle id="tituloGeneros" size="small" className='font-bold'>Deixados de Lado</IonTitle>
        </IonRow>
        <IonRow>
          {bookLeftAside.length === 0 ? (
            <IonCol className="text-center">Você não possui livros deixados de lado.</IonCol>
          ) : (
            <Swiper
              autoplay={true}
              keyboard={true}
              pagination={true}
              scrollbar={true}
              zoom={true}
              slidesPerView={4}
              loop={true}
              className="grid grid-cols-4 gap-4"
            >
              {bookLeftAside.map((book: Book) => (
                <SwiperSlide key={book.id} className="w-full mr-2">
                  <IonCol>
                    <IonRow className="h-full flex justify-center items-center">
                      <img
                        src={book.volumeInfo.imageLinks?.thumbnail}
                        alt={book.volumeInfo.title}
                        onClick={() => handleBookClick(book.id)}
                        className="max-w-full max-h-full object-cover"
                      />
                    </IonRow>
                    <IonRow className="h-full flex justify-center items-center "><br />
                      <IonIcon icon={trashBinOutline} color="danger" className='text-2xl mt-6 bg-none border-none absolute text-white' onClick={() => confirmRemoveBook(book.id, 'leftAside')} />
                      <br /><br />
                    </IonRow>
                  </IonCol>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </IonRow> */}
      </IonGrid>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Confirmar exclusão'}
        message={'Tem certeza de que deseja excluir este livro?'}
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              setSelectedBook(null);
              setShowAlert(false);
            }
          },
          {
            text: 'Excluir',
            handler: handleRemoveBook
          }
        ]}
      />
    </IonContent>
  );
};

export default Perfil;
