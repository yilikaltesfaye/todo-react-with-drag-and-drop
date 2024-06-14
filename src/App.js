import { styled } from 'styled-components';
import { myTodos } from "./data/todos";
import { useState } from 'react';
import List from './Components/List';
import uuid from 'react-uuid';

function App() {
  const [todos, setTodos] = useState(myTodos)  
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value || value.length < 3) {
      return alert("Todo must be at least 3 Characters")      
    }

    const newTodos = [...todos, {
      id: uuid(),
      name: value,
      completed: false
    }]

    setTodos(newTodos)
    setValue('') //clear input
  }

  const removeTodo = (id) => {
    const filtered = todos.filter((todo) => {
      return todo.id !== id
    })

    setTodos(filtered)
  }

  return (
    <AppStyled className='App'>
      <form action='' className='form' onSubmit={handleSubmit}>
        <h1>Today's Tasks</h1>
        <div className="input-container">
          <input type="text" value={value} onChange={handleChange} placeholder='Add a Task' />
          <div className="submit-btn">
            <button>+ Add TODO</button>
          </div>
        </div>
      </form>

      <ul className="todos-con">
        {
          todos.map((todo) => {
            const{id, name, completed} = todo
            return <List 
                key={id} 
                id={id} 
                name={name} 
                completed={completed} 
                removeTodo = {removeTodo}
                />
          })
        }
      </ul>
    </AppStyled>
  );
}
const AppStyled = styled.div`

`;

export default App;
