import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const localData = localStorage.getItem('todos');
    return localData ? JSON.parse(localData) : [];
  });
  const [input, setInput] = useState('');
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (input.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false}]);
    setInput('');
  }

  const toggleTodo = (id) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed};
      }
      return todo;
    });
    setTodos(newTodos);
  }

  return (
    <div className="app-container">
      <h1>My To-Do List</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new task"
        ></input>
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "todo-item completed": "todo-item"}>
            <input type="checkbox" checked={todo.completed} onChange={()=>toggleTodo(todo.id)} />
            <span>{todo.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default App;