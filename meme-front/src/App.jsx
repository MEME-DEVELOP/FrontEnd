
import {Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import HomePrueba from './views/HomePrueba';
import Loading from './components/Loading';
import { useAuth0 } from "@auth0/auth0-react";
import RegisteringSite from './views/RegisteringSite';
import {APIgetUserEmail} from "./API/UsuariosAPI";
import UserSettings from './views/UserSettings';

//import ProtectedRoute from './components/ProtectedRoute';

const App = ()  => {

  const { isLoading} = useAuth0();


  if (isLoading) {
    return <Loading />;
  }
  return (
        <Routes>
          <Route path="/"  element = {<HomePrueba />}/>
          <Route  path="/Home"  element = {<Home />}/>
          <Route path = "/Registering" element = {<RegisteringSite/>} />
          <Route path = "/UserSettings" element = {<UserSettings/>} />
        </Routes>
  );
}

export default App;
