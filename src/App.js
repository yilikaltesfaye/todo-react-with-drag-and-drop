import { styled } from 'styled-components';
import { myTodos } from "./data/todos";
import { useState } from 'react';
import List from './Components/List';
import uuid from 'react-uuid';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

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

  const handleDragEnd = (event) => {
    const {active, over } = event 

    if(active.id !== over.id){
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = [...items]

        newItems.splice(oldIndex, 1)
        newItems.splice(newIndex, 0, items[oldIndex])

        return newItems
      })
    }
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
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={todos.map((todo) => todo.id)}>
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
      </SortableContext>
    </DndContext>
      
    </AppStyled>
  );
}
const AppStyled = styled.div`

`;

export default App;
