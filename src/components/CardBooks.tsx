import React, { useEffect, useState } from 'react';
import { IonGrid } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import { fetchBooksByGenre } from '../services/apiBooks';
import '../style.css';
import { useHistory } from 'react-router-dom';
import { initAuth } from '../services/useAuth'; 

interface Book {
  id: string;
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

interface CardBooksProps {
  genre: string;
}

const CardBooks: React.FC<CardBooksProps> = ({ genre }) => {
  const history = useHistory();
  const { user, status } = initAuth(); 
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    if (!status && !user) {
      history.push('/login');
    }
    if (user) {
      console.log("Usuário autenticado:", user.uid);
    }
  }, [status, user]);
  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await fetchBooksByGenre(genre);
      setBooks(fetchedBooks);
    };
    fetchBooks();
  }, [genre]);

  const handleBookClick = (id: string) => {
    history.push(`/livro/${id}`);
  };

  return (
    <div>
      <IonGrid>
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
          {books.map((book) => (
            <SwiperSlide key={book.id} className="w-full mr-2">
              <div className="h-full flex justify-center items-center">
                <img
                  //src={book.volumeInfo.imageLinks?.thumbnail}
                  src={`https://books.google.com/books/publisher/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`}
                  alt={book.volumeInfo.title}
                  onClick={() => handleBookClick(book.id)}
                  className="max-w-full max-h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </IonGrid>
    </div>
  );
};

export default CardBooks;
