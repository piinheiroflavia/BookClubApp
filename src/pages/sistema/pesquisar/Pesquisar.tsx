import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonSearchbar, IonTitle } from '@ionic/react';
import imgPesquisar from '../../../assets/imgs/imgPesquisar.png';
import '../../../style.css'
import { useParams, useHistory } from 'react-router-dom';
import { IonApp, IonToolbar, IonInput, IonButton, IonIcon, IonRow, IonCol, IonList, IonItem, IonLabel, IonThumbnail, IonImg } from '@ionic/react';
import { initClient, addbiblioteca, signIn } from '../../../services/googleAuth.js';
import { gapi } from 'gapi-script'; 
import { search } from 'ionicons/icons';
import { initAuth } from '../../../services/useAuth';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

interface GapiResponse {
  result: {
    items: Book[];
  };
}

const Pesquisar: React.FC = () => {
  const history = useHistory();
  const [query, setQuery] = useState<string>('');
  const [books, setBooks] = useState<Book[]>([]);
  const [showImage, setShowImage] = useState<boolean>(true);
  const { user, status } = initAuth();

  useEffect(() => {
    initClient();
  }, []);

  useEffect(() => {
    if (!status && !user) {
      history.push('/login');
    }
    if (user) {
      console.log("Usuário autenticado:", user.uid);
    }
  }, [status, user]);

  const searchBooks = async () => {
    setShowImage(false); // Oculta a imagem após a pesquisa
    let imgPesquisa = document
    const response: GapiResponse = await gapi.client.books.volumes.list({
      q: query
    });
    setBooks(response.result.items);
    response.result.items.forEach((book: Book) => addbiblioteca(book.id));
  };

  const handleBookClick = (id: string) => {
    history.push(`/livro/${id}`);
  };

  return (
    <>
      <IonContent fullscreen>
      <IonToolbar color="tertiary">
          <IonTitle  size="large" className='mt-6 text-2xl text-center font-bold'>
          Procure um livro
          </IonTitle><br />
          <IonRow className='justify-center'>
            <IonCol  size="10">
               <IonSearchbar show-clear-button="focus" style={{ width: '100%' }}
                value={query}
                placeholder="Search for books..."
                onIonChange={e => setQuery(e.detail.value!)}/>
            </IonCol>
            <IonCol  size="2">
              <IonButton onClick={searchBooks}><IonIcon icon={search} className='text-center text-xl  absolute' /></IonButton>
            </IonCol> 
          </IonRow> 
         
        </IonToolbar>

        {showImage && <img id="imgPesquisa" src={imgPesquisar} alt="Imagem de pesquisa" />}
     
        <IonList color='Light' className='hover:'>
          {books.map(book => (
            <IonItem key={book.id}>
              <IonThumbnail slot="start">
                <IonImg 
                //src={book.volumeInfo.imageLinks?.thumbnail} 
                src={`https://books.google.com/books/publisher/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
                onClick={() => handleBookClick(book.id)} />
              </IonThumbnail>
              <IonLabel>
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors?.join(', ')}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};

export default Pesquisar;
