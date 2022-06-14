
import {Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import HomePrueba from './views/HomePrueba';
import Loading from './components/Loading';
import { useAuth0 } from "@auth0/auth0-react";
import RegisteringSite from './views/RegisteringSite';
import UserSettings from './views/UserSettings';
import InventarioCRUD from './views/InventarioCRUD';

//import ProtectedRoute from './components/ProtectedRoute';
import Pedidos from './views/Pedidos';
import Pruebas from './views/Pruebas'
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
          <Route path = "/Productos" element = {<InventarioCRUD/>} />
          <Route path="/Pedidos" element={<Pedidos/>}/>
          <Route path="/Pruebas" element={<Pruebas/>}/>
        </Routes>
        
  );
}

export default App;
