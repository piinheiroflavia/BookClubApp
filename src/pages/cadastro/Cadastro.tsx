import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonRouterLink, IonButton, IonIcon, IonInput, IonToast, IonLoading, IonAlert } from '@ionic/react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { logoGoogle, arrowBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import '../../style.css';
import { toast } from '../../components/Toasts';
import { registrerUser, signInWithGoogle } from '../../services/firebaseConf';

const Cadastro: React.FC = () => {
  const history = useHistory();
  const [busy, setBusy] = useState<boolean>(false);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confPassword, setConfpassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if ( email.trim() !== '' && password.trim() !== '' && confPassword.trim() !== '') {
      setButtonEnabled(false);
    } else {
      setButtonEnabled(true);
    }
  }, [ email, password, confPassword]);

  async function registrer() {
    setBusy(true);
    if (password !== confPassword) {
      setBusy(false);
      setAlertMessage('Senhas não coincidem');
      setShowAlert(true);
      return;
    }
    // try {
    //   const res = await registrerUser(email, password);
    //   toast('Seu cadastro foi realizado com sucesso!');
    // } catch (error) {
    //   setAlertMessage('Erro ao registrar usuário: ' );
    //   setShowAlert(true);
    // } finally {
    //   setBusy(false);
    // }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log('Google Sign-In successful:', result);
      LoginSucesso(result.user);
    } catch (error) {
      setAlertMessage('Erro ao fazer login com o Google: ');
      setShowAlert(true);
    }
  };

  const LoginSucesso = async (user: any) => {
    console.log('Informações:', user);
    // Salve as informações do usuário localmente ou no backend
    // Exemplo: localStorage.setItem('user', JSON.stringify(user));
    // Redirecione para uma página específica
    history.push('/tab1'); 
  };

  const handleButtonClick = () => {
    history.push('/info');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-tom-tomRoxoEscuro">
        <IonIcon icon={arrowBack} onClick={handleButtonClick} className='text-2xl m-3 text-tom-tomRosaEscuro font-bold border-none p-0 absolute top-0' />
        <div className="mt-20 m-6">
          <IonLoading message="Por favor esperar.." duration={0} isOpen={busy} />
          <IonTitle className='mt-6 text-start text-3xl text-tom-tomRoxoEscuro font-bold' size="large">Cadastro</IonTitle>
          <br />
          {/* <IonInput label="Login" label-placement="floating" fill="outline" placeholder="digite seu login.." onIonChange={(e: any) => setUsername(e.target.value)} /> */}
          <br />
          <IonInput label="Email" label-placement="floating" fill="outline" placeholder="digite seu email.." onIonChange={(e: any) => setEmail(e.target.value)} />
          <br />
          <IonInput label="Senha" type="password" label-placement="floating" fill="outline" placeholder="digite sua senha.." onIonChange={(e: any) => setPassword(e.target.value)} />
          <br />
          <IonInput label="Confirmar senha" type="password" label-placement="floating" fill="outline" placeholder="confirme sua senha.." onIonChange={(e: any) => setConfpassword(e.target.value)} />
          <br />
          <IonButton color="tertiary" className="flex justify-center text-white font-bold rounded" onClick={registrer} disabled={buttonEnabled}>Cadastrar</IonButton>
          <IonTitle size="small" className="text-center mt-10 text-xs">Já possui conta? <IonRouterLink routerLink="/login" color="tertiary">entre aqui</IonRouterLink></IonTitle>
          <IonGrid className="my-4">
            {/* <IonRow className="items-center">
              <IonCol className="flex-1">
                <hr className="border-t-2 border-tom-tomRosaEscuro" />
              </IonCol>
              <IonCol>
                <IonTitle size="small" className="ml-4">ou</IonTitle>
              </IonCol>
              <IonCol className="flex-1">
                <hr className="border-t-2 border-tom-tomRosaEscuro" />
              </IonCol>
            </IonRow>
            <IonRow className="mt-4">
              <IonCol className="flex justify-center">
                <IonButton id="btnGoogle" color="light" size="small" shape="round" onClick={handleGoogleSignIn}>
                  <IonIcon icon={logoGoogle} className="mr-2" />
                  Entrar com Google
                </IonButton>
              </IonCol>
            </IonRow> */}
          </IonGrid>
        </div>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Erro'}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
