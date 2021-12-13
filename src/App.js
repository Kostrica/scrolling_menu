import React from 'react';
import { Navigation } from './components/Navigation/Navigation';
import './App.css';

const navTabs = [
  {name: 'Job Focus', id: 1},
  {name: 'Soft Skills', id: 2},
  {name: 'Technical Skills', id: 3},
  {name: 'Functional Expertise', id: 4},
  {name: 'Domain Expertise', id: 5},
  {name: 'Patent Expertice', id: 6},
  {name: 'Personal Expertise', id: 7},
  {name: 'Hard Expertise', id: 8},
  {name: 'Domain Expertise', id: 9},
  {name: 'Domain Expertise', id: 10},
  {name: 'Domain Expertise', id: 11},
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation navTabs={navTabs} />
      </header>
    </div>
  );
}

export default App;
