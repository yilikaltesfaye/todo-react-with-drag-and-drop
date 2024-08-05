import { styled } from 'styled-components';
import { myTodos } from "./data/todos";
import { useState } from 'react';
import List from './Components/List';
import uuid from 'react-uuid';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useThemeContext } from './Context/themeContext';

function App() {
  const [todos, setTodos] = useState(myTodos)  
  const [value, setValue] = useState('')

  const theme = useThemeContext();

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
    <AppStyled className='App' theme={theme}>
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
  min-height: 100vh;
  padding: 5rem 25rem;
  background-color: ${(props) => props.theme.colorBg3};
  overflow: hidden;
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.colorBg2};
    border-radius: 1rem;
    margin-bottom: 2rem;
    padding: 2rem 1rem;
    /* width: 50rem; */
    box-shadow: ${(props) => props.theme.shadow3};
    h1 {
      font-size: clamp(1.5rem, 2vw, 2.5rem);
      font-weight: 800;
      color: ${(props) => props.theme.colorPrimaryGreen};
    }
    .input-container{
      margin: 2rem 0;
      position: relative;
      font-size: clamp(1rem, 2vw, 1.2rem);
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      input, button {
        font-family: inherit;
        font-size: clamp(1rem, 2vw, 1.2rem);
      }
      input {
        background: transparent;
        border: 1px solid ${(props) => props.theme.colorIcons3};
        border-radius: 7px;
        padding: .8rem 1rem;
        color: ${(props) => props.theme.colorGrey2};
        width: 100%;
        &:focus {
          outline: none;
        }
        &:placeholder{
          color: ${(props) => props.theme.colorGrey3};
        }
        &:active, &:focus {
          border: 1px solid ${(props) => props.theme.colorIcons};
        }
      }
    }

  }
`;

export default App;
