import React from 'react';
import { IonContent, IonPage, IonTitle, IonRow, IonToolbar } from '@ionic/react';
import CardBooks from '../../../components/CardBooks';
import { useEffect } from 'react';
import { initAuth } from '../../../services/useAuth'; // Importe o hook useAuth aqui
import { useParams, useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();
  const categories = [
    { name: 'Mais Vendidos', query: 'best sellers' },
    { name: 'Fantasia', query: 'Fantasia' },
    { name: 'Romance', query: 'Romance' },
    { name: 'Melhores Livros', query: 'Best Books Of Sll Time' },
    { name: 'Leituras Gratuitas', query: 'Free' },
    { name: 'Mais Comprados por Jovens', query: 'Books For Teenagers' },
    { name: 'Suspense', query: 'Suspense' }
  ];
 
  const { user, status } = initAuth(); 

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
      console.log("Usuário autenticado:", user.uid);
    }
  }, [user]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonToolbar color="tertiary">
          <IonTitle size="large" className='mt-6 text-2xl text-center font-bold'>
            Biblioteca de livros
          </IonTitle>
          <br />
        </IonToolbar>

        {categories.map(category => (
          <div key={category.query}>
            <IonRow className='mt-6'>
              <IonTitle size="small" className='font-bold'>
                {category.name}
              </IonTitle>
            </IonRow>
            <CardBooks genre={category.query} />
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
