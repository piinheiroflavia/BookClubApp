import axios from 'axios';


const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyDS1kAl-eiGbXhL-fjxDI3xhkyzD3d6Hd8'; // Substitua pela sua chave de API do Google Books

// Defina interfaces para os dados da API do Google Books
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

interface GoogleBooksApiResponse {
  items: Book[];
}
const categories = [
  { name: 'Mais Famosos do Mundo', query: 'best books of all time' },
  { name: 'Mais Famosos do Brasil', query: 'best Brazilian books' },
  { name: 'Mais Vendidos', query: 'best sellers' },
  { name: 'Top 10 Comprados', query: 'Top 10 Comprados' },
  // Adicione mais categorias conforme necessário
];

export const fetchBooksByGenre = async (genre: string) => {
  const query = genre === 'free' ? 'ebooks&filter=free-ebooks' : genre;
  const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`);
  return response.data.items.map((item: any) => ({
    id: item.id,
    volumeInfo: item.volumeInfo
  }));
};

export const getBooksByCategory = async (query: string): Promise<Book[]> => {
  const response = await fetch(`${API_BASE_URL}?q=${query}&maxResults=100`);
  if (!response.ok) {
    throw new Error('Erro ao buscar livros');
  }
  const data = await response.json();
  return data.items;
};
// Função para buscar livros pelo id
export const fetchBookById = async (id: string): Promise<Book | null> => {
  try {
    const response = await axios.get<Book>(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);    
    throw new Error('Erro ao buscar detalhes do livro. Tente novamente mais tarde.');
   // return null;
  }
};

export const getBookDetails = async (bookId: string) => {
  const response = await fetch(`${API_BASE_URL}/${bookId}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar detalhes do livro');
  }
  return response.json();
};