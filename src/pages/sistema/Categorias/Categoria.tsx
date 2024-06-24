import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonRefresher, IonRefresherContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import '../../../style.css';
import { initAuth } from '../../../services/useAuth'; 

const Categoria: React.FC = () => {
  const history = useHistory();
  const { user, status } = initAuth(); 
  useEffect(() => {
    if (!status && !user) {
      history.push('/login');
    }
    if (user) {
      console.log("Usuário autenticado:", user.uid);
    }
  }, [status, user]);

  function handleRefresh(event: CustomEvent) {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  const handleCategoryClick = (query: string) => {
    const searchQuery = query === 'free' ? 'ebooks&filter=free-ebooks' : query;
    history.push(`/categoria/${query}`);
  };

  const categories = [
    { name: 'Fantasia', query: 'Fantasia' },
    { name: 'Romance', query: 'Romance' },
    { name: 'Aventura', query: 'Aventura' },
    { name: 'Suspense', query: 'Suspense' },
    { name: 'Literatura Brasileira', query: 'Brazilian Literature' },
    { name: 'Melhores Livros', query: 'Best Books Of All Time' },
    { name: 'Mais Vendidos', query: 'Best Sellers' },
    { name: 'Mais Comprados por Jovens', query: 'Books For Teenagers' },
    { name: 'Leituras Gratuitas Pelo Google', query: 'Free' },
    // { name: 'Livros Adaptados para o Cinema', query: 'Adaptados para o Cinema' },
    { name: 'Livros de Rick Riordan', query: 'Rick Riordan' },
    { name: 'Livros de Holly Black', query: 'Holly Black' },
    { name: 'Livros de Leigh Bardugo', query: 'Leigh Bardugo' },
    { name: 'Livros de Cassandra Clare', query: 'Cassandra Clare' },
    { name: 'Livros de Sarah J. Maas', query: 'Sarah J. Maas' }
  ];

  return (
    <IonContent fullscreen>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent />
      </IonRefresher>
      <IonToolbar color="tertiary">
        <IonTitle size="large" className='mt-6 text-2xl text-center font-bold'>
          Categorias de livro
        </IonTitle>
        <br />
      </IonToolbar>
      <IonList>
        {categories.map((category) => (
          <IonItem key={category.query} button onClick={() => handleCategoryClick(category.query)}>
            <IonLabel>{category.name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default Categoria;
