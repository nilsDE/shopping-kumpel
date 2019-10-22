import React from 'react';
import NavBar from './components/NavBar';
import ShoppingList from './components/ShoppingList';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="main-content">
        <p>This App is called Shopping Kumpel!</p>
        <ShoppingList />
      </div>
    </div>
  );
}

export default App;
