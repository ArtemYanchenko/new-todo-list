import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

function App() {

  const tasks = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: true },
    { id: 4, title: "Redux", isDone: false },
    { id: 5, title: "GraphQl", isDone: false }
  ]


  return (
    <div className='App'>
      <TodoList title='What to learn' tasks={tasks}/>
    </div>
  );
}

export default App;
