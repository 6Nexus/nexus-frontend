import React, { useState } from 'react';
import Navbar from './plataforma-admin/componentes/NavBar/';
import Titulos from './plataforma-admin/componentes/Titulos/Titulos';

function App() {

  const [selectedSection, setSelectedSection] = useState('showProfessores');

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    return (
        <div className="fdo">
            <Navbar onSectionChange={handleSectionChange} />
            <div className="fundo">
                <div className="caixa">
                    <h1 className="titulo">{selectedSection}</h1>
                    <Titulos selectedSection={selectedSection} />
                </div>
            </div>
        </div>
    );
};

export default App;
