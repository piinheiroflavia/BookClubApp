import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonAlert } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchBookById } from '../../../services/apiBooks';
import { saveBookIdToLibrary, saveBookIdToLibraryRead, saveBookIdToLibraryIWantToRead, saveBookIdToLibraryInReading, saveBookIdToLibraryLeftAside } from '../../../services/firebaseConf';
import { initAuth } from '../../../services/useAuth'; 
import { arrowBack } from 'ionicons/icons';
import '../../../style.css';

interface VolumeInfo {
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
  previewLink?: string;
}

interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

const Livro: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user, status } = initAuth(); 
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (!status && !user) {
      console.log('Usuário não está logado, redirecionando para a página de login...');
      history.push('/login');
    }
    if (user) {
      console.log("Usuário autenticado:", user.uid);
    }
  }, [status, user]);

  const handleButtonClick = () => {
    history.push('/tab1');
  };

  const handleAddToLibrary = async (option: string) => {
    if (!user) {
      setAlertMessage('Você precisa estar autenticado para adicionar livros.');
      setShowAlert(true);
      return;
    }
    try {
      if (book) {
        console.log(`Tentando adicionar livro à ${option}:`, book.volumeInfo.title);
        switch (option) {
          case 'library':
            await saveBookIdToLibrary(user.uid, id);
            setAlertMessage('Livro adicionado à sua biblioteca!');
            break;
          case 'read':
            await saveBookIdToLibraryRead(user.uid, id);
            setAlertMessage('Livro adicionado aos que estão em leitura!');
            break;
          case 'wantToRead':
            await saveBookIdToLibraryIWantToRead(user.uid, id);
            setAlertMessage('Livro adicionado aos finalizados!');
            break;
          case 'InReading':
            await saveBookIdToLibraryInReading(user.uid, id);
            setAlertMessage('Livro adicionado aos que estão em leitura!');
            break;
          case 'LeftAside':
            await saveBookIdToLibraryLeftAside(user.uid, id);
            setAlertMessage('Livro adicionado aos livros abandonados!');
            break;
          default:
            break;
        }
        setShowAlert(true);
      }
    } catch (error) {
      console.error(`Erro ao adicionar livro à ${option}:`, error);
      setAlertMessage(`Erro ao adicionar livro à ${option}.`);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const fetchedBook = await fetchBookById(id);
        if (fetchedBook) {
          setBook(fetchedBook);
        } else {
          setError('No book found');
        }
      } catch (err) {
        setError('Failed to fetch book');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!book) {
    return <div>No book found</div>;
  }

  const handleReadOnGoogle = () => {
    if (book && book.volumeInfo.previewLink) {
      window.open(`${book.volumeInfo.previewLink}&printsec=frontcover&hl=pt-BR#v=onepage&q&f=false`, '_blank');
    } else {
      console.error('Link de visualização não disponível.');
    }
  };

  return (
    <IonContent fullscreen className="bg-tom-tomRoxoEscuro">
      <IonHeader className='bg-tom-tomRoxoEscuro'>
        <IonToolbar className='bg-tom-tomRoxoEscuro'>
          <IonIcon icon={arrowBack} onClick={handleButtonClick} className='text-2xl m-3 text-tom-tomRosaEscuro font-bold border-none p-0 absolute top-0' />
          <IonButton color="tertiary" id="open-action-sheet" className="right-0 m-2 text-tom-tomRosaEscuro absolute top-0 round-button">
            <IonSelect className='round-button' placeholder="+"  onIonChange={(e) => handleAddToLibrary(e.detail.value)}>
              {/* <IonSelectOption value="library">Add aos Favoritos</IonSelectOption> */}
              <IonSelectOption value="read">Add Livros em leitura</IonSelectOption>
              <IonSelectOption value="wantToRead">Add Finalizados</IonSelectOption>
              {/* <IonSelectOption value="InReading">Add em Andamento</IonSelectOption>
              <IonSelectOption value="LeftAside">Add aos Abandonados</IonSelectOption> */}
            </IonSelect>
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonGrid id="bloco1" style={{ background:'#6030FF' }} className='text-white font-bold flex justify-center'>
        <IonRow>
          <IonCol>
            <img 
            //src={book.volumeInfo.imageLinks.thumbnail} 
            src={`https://books.google.com/books/publisher/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
            className="img" alt="Descrição da Imagem" /><br />
          </IonCol>
        </IonRow>
      </IonGrid>
      <div>
        <br />
        <IonTitle size="large" className='text-2xl mb-2 font-bold text-center'>{book.volumeInfo.title}</IonTitle>
        <IonTitle size="small" className='text-center'>{book.volumeInfo.authors.join(', ')}</IonTitle>
        <IonTitle size="small" className='text-center'>Avaliação: {book.volumeInfo.averageRating}</IonTitle>
        <br />
        <IonTitle size="small" className=''><strong>Sinopse:</strong><br /> {book.volumeInfo.description}</IonTitle>
        <br />
        <IonTitle size="small" className=''><strong>Ano</strong><br />{book.volumeInfo.publishedDate}</IonTitle> <br />
        <IonTitle size="small" className=''><strong>Páginas</strong><br /> {book.volumeInfo.pageCount}</IonTitle> <br />
        <IonTitle size="small" className=''><strong>Categoria:</strong><br />{book.volumeInfo.categories.join(', ')}</IonTitle>
        <br />
        <IonTitle size="small" className=''><strong>Editora:</strong><br /> {book.volumeInfo.publisher}</IonTitle>
        <br />
        <IonButton color="tertiary" className="right-0 m-2 font-bold justify-center text-tom-tomRosaEscuro" onClick={handleReadOnGoogle}>Ler no Google</IonButton>

        <br/><br/>
      </div>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Notificação'}
        message={alertMessage}
        buttons={['OK']}
      />
    </IonContent>
  );
};

export default Livro;
