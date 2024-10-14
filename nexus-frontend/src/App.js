import { BrowserRouter } from 'react-router-dom';
import Home from "./plataforma-mae/pages/Home/Home"
import Perfil from "./plataforma-professor/paginas/Perfil/Perfil"
import CursoSetup from './plataforma-professor/paginas/CursoSetup/CursoSetup';
import Login from './plataforma-professor/paginas/Login/Login';

const App = () => {
    return (
        <BrowserRouter>
            <Perfil />
        </BrowserRouter>
    );
}

export default App;



