import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchBooksByGenre } from '../services/apiBooks';
import '../style.css';
import { arrowBack } from 'ionicons/icons';
import { initAuth } from '../services/useAuth'; 

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
}

interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

const BooksByCategory: React.FC = () => {
  const history = useHistory();
  const { user, status } = initAuth(); 
  const { category } = useParams<{ category: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!status && !user) {
      history.push('/login');
    }
    if (user) {
      console.log("Usuário autenticado:", user.uid);
    }
  }, [status, user]);
  const handleBookClick = (id: string) => {
    history.push(`/livro/${id}`);
  };

  const handleButtonClickInfo = () => {
    history.push('/categoria');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await fetchBooksByGenre(category);
        setBooks(fetchedBooks);
      } catch (err) {
        setError('Failed to fetch books');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const groupedBooks = [];
  for (let i = 0; i < books.length; i += 3) {
    groupedBooks.push(books.slice(i, i + 3));
  }

  return (
    <IonContent fullscreen className="bg-tom-tomRoxoEscuro">
      <IonHeader>
        <IonToolbar color="primary">
          <IonIcon icon={arrowBack} onClick={handleButtonClickInfo} className='text-2xl m-3 font-bold border-none p-0 absolute top-0' />
          <IonTitle id="open-action-sheet" className="right-0 m-2 text-2xl font-bold absolute top-0 round-button">{category}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonGrid>
        {groupedBooks.map((bookGroup, groupIndex) => (
          <IonRow key={groupIndex} className="ion-align-items-center">
            {bookGroup.map((book) => (
              <IonCol size="4" key={book.id}>
                <div className="book-card" onClick={() => handleBookClick(book.id)}>
                  <img
                    //src={book.volumeInfo.imageLinks?.thumbnail}
                    src={`https://books.google.com/books/publisher/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
                    alt={book.volumeInfo.title}
                    className="book-image"
                  />
                  <h3 className="book-title">{book.volumeInfo.title}</h3>
                </div>
              </IonCol>
            ))}
          </IonRow>
        ))}
      </IonGrid>
    </IonContent>
  );
};

export default BooksByCategory;
