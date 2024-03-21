import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo,deleteTodo,toggleTodo} from './Slice/TodoSlice';

function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      dispatch(addTodo({
        id: Date.now(),
        text,
        completed: false,
      }));
      setText('');
    }
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  const handleToggleTodo = id => {
    dispatch(toggleTodo(id));
  };
  const completedTodos = useSelector(state =>
    state.todos.filter(todo => todo.completed === true)
);

  return (
    <div className='container'>
      <h1 className='mt-5' >All Todo List</h1>
      <input 
        type="text" 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Enter todo"
      />
      <button onClick={handleAddTodo} className='btn btn-primary '>Submit</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className='d-flex justify-content-around mt-3 p-2 '>
            <div>
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => handleToggleTodo(todo.id)} 
              />
               <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            </div>
           
           <div> 
            <button onClick={() => handleDeleteTodo(todo.id)} className='btn btn-warning'>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className='mt-4'>Total Complete items: {completedTodos.length}</h3>
    </div>   
  );
 
}

export default App;