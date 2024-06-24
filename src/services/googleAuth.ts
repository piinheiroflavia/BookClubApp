import { gapi } from 'gapi-script';
import AsyncStorage from '@react-native-async-storage/async-storage';
//precisa instalar npm install @react-native-async-storage/async-storage
import { toast } from '../components/Toasts';

const CLIENT_ID = '417506285688-d3n63hagq9mcq5mulmed2udgauvp1q06.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDS1kAl-eiGbXhL-fjxDI3xhkyzD3d6Hd8';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/books/v1/rest"];
const SCOPES = "https://www.googleapis.com/auth/books";


// Adicione AsyncStorage para persistência de token em aplicativos móveis

export const initClient = (): void => {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    });
  });
};

export const signIn = (): void => {
  gapi.auth2.getAuthInstance().signIn().then((user: any) => {
    const accessToken = user.getAuthResponse().access_token;
    // Armazene o token de acesso usando AsyncStorage
    AsyncStorage.setItem('google_access_token', accessToken);
  }).catch((error: any) => {
    toast('Erro ao fazer login: ' + error.message);
  });
};

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

export const addbiblioteca = async (bookId: string): Promise<void> => {
  try {
    const accessToken = await AsyncStorage.getItem('google_access_token');
    if (!accessToken) throw new Error('Token de acesso não encontrado');

    await gapi.client.books.mylibrary.bookshelves.volumes.add({
      shelf: '0',
      volumeId: bookId
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    toast('Livro adicionado à sua biblioteca!');
  } catch (error: any) {
    toast('Erro ao adicionar livro à biblioteca: ' + error.message);
  }
};
