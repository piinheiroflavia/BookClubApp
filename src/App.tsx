import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { search, book, archive} from 'ionicons/icons';
import Tab1 from './pages/sistema/home/Home';
import Perfil from './pages/sistema/perfil/Perfil';
import Pesquisar from './pages/sistema/pesquisar/Pesquisar';
import Livro from './pages/sistema/livro/Livro';
import Info from './pages/Info/Info';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import SobreNos from './pages/sistema/SobreNos/SobreNos';
import BooksByCategory  from './components/BooksByCategory';
import Categoria from './pages/sistema/Categorias/Categoria';
//import { AuthProvider } from './services/useAuth'; // Importe o AuthProvider


import './style.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';


/* Theme variables */
import './theme/variables.css';
import './index.css';

setupIonicReact();

// Função que verifica se uma rota deve exibir o menu de tabs
const shouldShowTabs = (path: string): boolean => {
  // Adicione aqui as rotas que devem exibir o menu de tabs
  return !['/login', '/cadastro'].includes(path);
};

// Componente de rota personalizado para envolver as rotas que precisam do menu de tabs
const TabRoute: React.FC<{ path: string, component: React.FC }> = ({ component: Component, path }) => (
  <Route path={path}>
    {shouldShowTabs(path) ? (
      <IonTabs>
        <IonRouterOutlet>
          <Component />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={book} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="categoria" href="/categoria">
            <IonIcon aria-hidden="true" icon={archive} />
            <IonLabel>Categorias</IonLabel>
          </IonTabButton>
          <IonTabButton tab="pesquisar" href="/pesquisar">
            <IonIcon aria-hidden="true" icon={search} />
            <IonLabel>Pesquisar</IonLabel>
          </IonTabButton>
          <IonTabButton tab="perfil" href="/perfil">
            <IonIcon aria-hidden="true" icon={book} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    ) : (
      <Component />
    )}
  </Route>
);

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <TabRoute path="/tab1" component={Tab1}  />  
      <TabRoute path="/perfil" component={Perfil} />
      <TabRoute path="/livro" component={Livro} />
      <TabRoute path="/SobreNos" component={SobreNos}/>
      <TabRoute path="/livro/:id" component={Livro} />
      <TabRoute path="/categoria" component={Categoria} />
      <TabRoute path="/pesquisar" component={Pesquisar} />     
      <Route path="/categoria/:category" component={BooksByCategory} exact={true} />
      <Route path="/info" component={Info} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route exact path="/">
        <Redirect to="/info" />
      </Route>
    </IonReactRouter>
  </IonApp>
);

export default App;
