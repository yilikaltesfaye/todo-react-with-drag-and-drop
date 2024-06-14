import React from 'react';
import styled from 'styled-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";


const check = <i className="fa fa-check-circle" aria-hidden="true"></i>;

function List({id, name, completed, removeTodo}) {


  const {attributes, 
          listeners, 
          setNodeRef, 
          transform, 
          transition} = useSortable ({id})
  
  const style = {
    transform: CSS.Transform.toString(transform), 
    transition,
  }

  return (
    <ListStyled style={style} {...attributes} {...listeners} ref={setNodeRef}>
        <li onDoubleClick={() => removeTodo(id)}>
            <p>{name}</p>
        </li>
        <div className="complete-btn">
            {check}
        </div>
    </ListStyled>
  )
}

const ListStyled = styled.div`

`;

export default List;