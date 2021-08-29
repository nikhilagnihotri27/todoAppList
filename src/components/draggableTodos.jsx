import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import squareIcon from '../images/square-regular.svg';
import deleteIcon from '../images/trash-alt-regular.svg'

/*** Reorders draggable lists for DND library **/
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
/*** Reorders draggable lists for DND library **/

/**** Component for individual draggable todos *****/
const TodoList = ({ todos, setTodos, parentTodos }) => {

  /*** Moves the pending todo to a finished todo ****/
  const handleClick = (e) => {
    let updatedTodos = parentTodos.map((todo,i) => {
      if(todo.value === e.target.parentNode.parentNode.innerText){
        return {value:todo.value,status:'done'}
      }
      else{
        return {value:todo.value,...todo};
      }
    });
    setTodos(updatedTodos);
  }
  /*** Moves the pending todo to a finished todo ****/

  /**** Deletes pending todo from the list ****/
  const handleDelete = (e) => {
    let updatedTodos = parentTodos.filter(todo => {
        return todo.value !== e.target.parentNode.attributes[1].value
    });
    setTodos(updatedTodos);
  }
  /**** Deletes pending todo from the list ****/

  return todos.map((todo, index) => (
    <Draggable draggableId={todo.id} index={index} key={todo.id}>
      {provided => (
        <div className="todo-row draggable" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="check-icon">
              <img onClick={handleClick} src={squareIcon}></img>
              <span>{todo.content}</span>
          </div>
          <div className="del-icon" data-val={todo.content} onClick={handleDelete} ><img src={deleteIcon}></img></div>
        </div>
      )}
    </Draggable>
  ));
};
/**** Component for individual draggable todos *****/

/**** This component handles the pending todos and gives them draggable functionality ***/
const TodosList = (props) => {
  const [todosData, setTodosData] = useState({ todos: [] });

  useEffect(() => {
    let initialTodos = [];
    props.todos.forEach((todo,i) => { 
     if(todo.status==="pending"){
      initialTodos.push({ id: `id-${i}`, content: todo.value }); 
     } 
    });
    setTodosData({ todos: initialTodos });
  }, [props])

  function onDragEnd(result) {
    if (!result.destination) {  return; }
    if (result.destination.index === result.source.index) { return;}
    const todos = reorder( todosData.todos, result.source.index, result.destination.index );
    setTodosData({ todos });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <TodoList todos={todosData.todos} setTodos={props.setTodos} parentTodos={props.todos}/>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
/**** This component handles the pending todos and gives them draggable functionality ***/

export default TodosList;