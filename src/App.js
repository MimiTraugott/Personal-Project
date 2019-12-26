import React from 'react';
import Hamburger from './Components/Hamburger';
import Header from './Components/Header';
import Landing from './Components/Landing';
import OrderPage from './Components/OrderPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Hamburger/>
      <Landing/>
 
    </div>
  );
}

export default App;
