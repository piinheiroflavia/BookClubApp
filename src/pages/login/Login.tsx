import React, {useState ,useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonRouterLink,IonButton, IonIcon,IonInput, IonToast, IonLoading} from '@ionic/react';
import { IonGrid, IonRow, IonCol,} from '@ionic/react';
import { logoGoogle } from 'ionicons/icons'; 
import { useHistory } from 'react-router-dom'; 
import { arrowBack } from 'ionicons/icons';
import { loginUser } from '../../services/firebaseConf'
import '../../style.css'
import {toast} from '../../components/Toasts'
import { signIn } from '../../services/googleAuth.js';  
import { signInWithGoogle } from '../../services/firebaseConf';

const Login: React.FC = () => {
  const history = useHistory(); 
  const [busy, setBusy] = useState<boolean>(false);
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resName = document.querySelector('#resName');
  const resPassword = document.querySelector('#resPassword');
  const resAll = document.querySelector('#resAll');

  useEffect(() => {
    if (email.trim() !== '' && password.trim() !== '') {
        setButtonEnabled(false);
    } else {
        setButtonEnabled(true);
    }
  }, [email, password]);
 

  async function login() {
    setBusy(true)
    const res = await loginUser(email, password);
    if (!res) {
      displayMessage('Erro em suas credenciais');
    } else {
      displayMessage('Login realizado com sucesso!');
      history.push('/tab1');   
    }
    setBusy(false)
  }

  function displayMessage(message:string ) {
    resAll!.innerHTML = message;
      setTimeout(() => {
        resAll!.innerHTML = message;
      }, 1000); 
  }
  const handleButtonClickInfo = () => {  
    history.push('/info');
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      console.log('Google Sign-In successful:', result);
      LoginSucesso(result.user);
    } catch (error) {
      toast('Erro ao fazer login com o Google: ');
    }
  };

  const LoginSucesso = async (user: any) => {
    console.log('Informações:', user);
    // Salve as informações do usuário localmente ou no backend
    // Exemplo: localStorage.setItem('user', JSON.stringify(user));
    // Redirecione para uma página específica
    history.push('/tab1'); 
  };
  return (
    <IonPage>
    <IonContent fullscreen className="bg-tom-tomRoxoEscuro">
      <IonIcon icon={arrowBack} onClick={handleButtonClickInfo} className=' text-2xl m-3 text-tom-tomRosaEscuro font-bold border-none p-0 absolute top-0' />
      <div className="mt-20 m-6" > 
      
      <IonLoading message="Por favor esperar.." duration={0} isOpen={busy} />

      <IonTitle className='mt-6 text-start text-3xl text-tom-tomRoxoEscuro font-bold'  size="large" class="titulo">Login</IonTitle>

      <br></br> 

      <IonInput label="Login" label-placement="floating" fill="outline" placeholder="digite seu login.." 
      onIonChange={(e: any) => setEmail(e.target.value)}
      ></IonInput>  
      <p id='resName'> </p>

      <br></br>    

      <IonInput label="Senha" type="password" label-placement="floating" fill="outline" placeholder="digite sua senha.." 
      onIonChange={(e: any) => setPassword(e.target.value)}></IonInput>      
      <p id='resPassword'> </p> 

      <br></br>
      
      <p id='resAll'>  </p> 
      <IonButton color="tertiary" id="btn" className="flex justify-center text-white font-bold rounded"
      onClick={login}
      disabled={buttonEnabled}
      >Login</IonButton>        

      <IonTitle size="small" className=" text-center mt-10 text-xs">Não possui conta? <IonRouterLink routerLink="/cadastro" color="tertiary">cadastra</IonRouterLink> se aqui</IonTitle>
      <IonGrid className="my-4">
        {/*<IonRow className="items-center">
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
    </IonContent>

  </IonPage>
    
    
  );
};

export default Login;
