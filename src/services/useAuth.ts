import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from './firebaseConf';
import { User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  status: boolean;
}

// Criar o contexto AuthContext
export const AuthContext = createContext<AuthContextType>({ user: null, status: true });

// Criar o hook useAuth
export const useAuth = () => {
  return useContext(AuthContext);
};

// Criar a função para iniciar a autenticação
export const initAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setstatus] = useState(true);
    
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Atualize o estado do usuário quando o estado de autenticação mudar
      setstatus(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, status };
};
