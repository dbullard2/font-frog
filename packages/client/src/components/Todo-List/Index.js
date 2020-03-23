import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Index = () => {
  const [todos, setTodos] = useState([]);
  return (
    <div className='App'>
      <TodoForm
        saveTodo={todoText => {
          const trimmedText = todoText.trim();

          if (trimmedText.length > 0) {
            setTodos([...todos, trimmedText]);
          }
        }}
      />
      <TodoList
        todos={todos}
        deleteTodo={todoIndex => {
          const newTodos = todos.filter((_, index) => index !== todoIndex);
          setTodos(newTodos);
        }}
      />
    </div>
  );
};
export default Index;
