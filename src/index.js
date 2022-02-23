import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let dialogs = [
  { id: 1, name: 'Dima' },
  { id: 2, name: 'Max' },
  { id: 3, name: 'Kostya' },
  { id: 4, name: 'Ivan' },
  { id: 5, name: 'Vlad' }
];

let messages = [
  { id: 1, message: 'Hi' },
  { id: 2, message: 'How are you?' },
  { id: 3, message: 'Fine' }
];

let posts = [
  { id: 1, message: 'Hi, how are you?', likesCount: 1 },
  { id: 2, message: 'It\'s my first post', likesCount: 1 }
]

ReactDOM.render(
  <React.StrictMode>
    <App dialogs={dialogs} messages={messages} posts={posts} />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
