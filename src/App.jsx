import React, { useEffect, useState } from 'react';
import './App.css';

import ChatBot from './ChatBot';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/message')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div className="App">
     
      <div>
      <ChatBot />
      </div>
    </div>
  );
}

export default App;
