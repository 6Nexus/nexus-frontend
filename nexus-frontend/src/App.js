import api from "./api"; 

const App = () => {
    function listar() { 
        console.log(api.get()); 
    }

    return (
        <button onClick={listar}>Listar</button> 
    );
}

export default App;
