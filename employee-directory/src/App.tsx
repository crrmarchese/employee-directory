import React from 'react';
// Prime React Library
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext'
// Component
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <div className="box p-d-flex p-mb-3">Flex Container
      <InputText />
      
      </div>
    </>
  );
}

export default App;
