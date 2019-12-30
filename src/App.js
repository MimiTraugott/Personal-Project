import React from 'react';
import Header from './Components/Header'
import PageBackround from './Components/PageBackground'
import routes from './routes';

import './App.css';

function App() {
  return (
    <div className="App">
      <PageBackround>
      <Header/>
      {routes}
      </PageBackround>
 
    </div>
  );
}

export default App;
