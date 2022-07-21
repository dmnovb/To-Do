import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CreateTodo from './components/createTodo'
import GetDate from './components/getDate'
import ModalTest from './components/modal'


import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GetDate/>
    <CreateTodo/> 
    <App/>
  </React.StrictMode>
);

reportWebVitals();
