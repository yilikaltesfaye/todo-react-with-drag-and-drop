import React from 'react';
import styled from 'styled-components';
const check = <i className="fa fa-check-circle" aria-hidden="true"></i>;

function List({id, name, completed, removeTodo}) {
  return (
    <ListStyled>
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