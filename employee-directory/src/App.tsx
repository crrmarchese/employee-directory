import React from 'react';
// Prime React Library
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

// Components
import Header from './components/Header'
import Table from './components/Table'



function App() {
  return (
    <>
      <div className="container p-py-4 p-m-auto p-px-5">
            <Header />
             <div className="box p-d-flex p-mb-3">
            <Table />
             </div>
      </div>
      
    </>
  );
}

export default App;
