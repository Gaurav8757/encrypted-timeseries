// import { useState } from 'react'
import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const frontend = socketIOClient(`http://localhost:${7000}`);
import './App.css'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    frontend.on('newData', (newData) => {
      setData((prevData) => [...prevData, newData]);
    });
  }, []);


  return (
    <>
      
      <div>
      <h1>Real-time Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
