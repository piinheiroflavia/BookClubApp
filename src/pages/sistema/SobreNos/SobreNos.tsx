import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonGrid, IonRow, IonCol, IonFabButton, IonText } from '@ionic/react';
import { arrowBack} from 'ionicons/icons';
import { useHistory } from 'react-router-dom'; 
import '../../../style.css';
import { initAuth } from '../../../services/useAuth';

const sobreNos: React.FC = () => {
  const history = useHistory();
  const { user, status } = initAuth();
  
  useEffect(() => {
    if (!status && !user) {
    console.log('Usuário não está logado, redirecionando para a página de login...');
    history.push('/login');
    } else if (user) {
    console.log("Usuário autenticado:", user.uid);
    }
    }, [status, user, history]);

  const handleButtonClickInfo = () => {
    history.push('/perfil');
  };

  return (
    <IonContent fullscreen className="container">
      <IonHeader>
        <IonToolbar>
        <IonIcon icon={arrowBack} onClick={handleButtonClickInfo} className='text-2xl m-3 text-tom-tomRosaEscuro font-bold border-none p-0 absolute top-0' />
        </IonToolbar>
        <IonRow>
        <IonToolbar color="tertiary" style={{ padding: '10px 0px', boxShadow: 'none' }}>
        <IonRow>
              <IonTitle className='mt-4 text-2xl text-center font-bold '  size="large">Sobre Nós</IonTitle>
            </IonRow>
            <IonRow>
              <IonTitle className='mb-6 text-lg text-white  flex  text-center '>O que é o book Club?</IonTitle>
            </IonRow>
        </IonToolbar>
        </IonRow>
      </IonHeader>
      <IonRow className='mt-6'>
        <IonTitle id="" className='mt-6 font-bold text-center'> Bem-vindo à nossa página!</IonTitle>
        <IonText style={{ margin: '10px 20px', textAlign: 'justify', fontSize: '1.2em' }}>
          Somos uma equipe apaixonada por leitura e tecnologia. Surgimos da união entre uma empresa de pesquisas e uma ONG com o objetivo de criar um aplicativo móvel para organizar suas leituras de forma simples e eficiente. <br/>
          Nosso aplicativo foi desenvolvido para atender às suas necessidades, permitindo que você catalogue e organize seus livros já lidos, em leitura, interrompidos e na lista de espera. Com uma interface intuitiva e amigável, garantimos uma experiência agradável para os nossos usuários.

          Junte-se a nós e simplifique sua vida literária!
        </IonText><br />
        <IonText style={{ margin: '10px 20px', textAlign: 'justify', fontSize: '1.2em' }}><strong>Integrante:</strong> Ana Flavia Gomes Pinheiro</IonText>
        <br /><br /><br />
        <IonText style={{ margin: '10px 20px', textAlign: 'center', fontSize: '0.9em' }}>
          ©2024 - Desenvolvido Por Flavia Pinheiro
        </IonText><br />
      </IonRow>
    </IonContent>
  );
};

export default sobreNos;
