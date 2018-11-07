import AuthService from '../../services/AuthService';

const Auth = new AuthService();

export const LoginContext = React.createContext({
    isLogin: Auth.loggedIn(),
    logUserIn: () => {},
  });