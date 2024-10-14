import { BrowserRouter } from 'react-router-dom';
import Home from "./plataforma-mae/pages/Home/Home"
// import Perfil from "./plataforma-professor/paginas/Perfil"
import CursoSetup from './plataforma-professor/paginas/CursoSetup/CursoSetup';

const App = () => {
    return (
        <BrowserRouter>
            <CursoSetup />
        </BrowserRouter>
    );
}

export default App;



