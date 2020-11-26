import React from 'react';
import ReactDOM from 'react-dom';
import useLocalStorage from './use-local-storage';

function App() {
  // Similar to useState but first arg is key to the value in local storage
  const [name, setName] = useLocalStorage('name', 'Bob');
  
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
