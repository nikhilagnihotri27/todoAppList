import {React, useEffect, useState} from 'react';
import TodosList from './draggableTodos';
import deleteIcon from '../images/trash-alt-regular.svg';
import checkIcon from '../images/check-square-regular.svg';
import plusIcon from '../images/plus-square-regular.svg';

/**** This component displays the Todo list for the specific user *****/
const TodoList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [todos, setTodos] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [addInput, setAddInput] = useState("");

    /**** On todos page, check if user is logged in. 
    ** If not loggedin, take user to the login page **
    ** If logged in, store the todos of this user in local states ***/
    useEffect(() => {
        let userData = localStorage.getItem("todoListUserData");
        if(userData!== null){
            userData = JSON.parse(userData);
            let isUserAuthenticated = false;
            userData.forEach(user => {
                if(user.auth === true){ 
                    isUserAuthenticated = true; 
                    setCurrentUser(user.email);
                    setTodos(user.todos);
                }
            });
            !isUserAuthenticated ? window.location.pathname = "/" : setIsLoading(false);
        }
        else{
            window.location.pathname = "/";
        }
    }, []);

    /**** Whenever todos are updated, update them in the local storage ***/
    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("todoListUserData"));
        userData.forEach(user => {
            if(user.email === currentUser){
                user.todos = [...todos];
            }
        });
        localStorage.setItem("todoListUserData", JSON.stringify(userData));
        setAddInput('');    //Clear out text input field
    }, [todos]);
    /**** Whenever todos are updated, update them in the local storage ***/

    /**** On Click of logout button, take the user to login page ***/
    const handleLogout = () => {
        let userData = JSON.parse(localStorage.getItem("todoListUserData"));
        userData.forEach(user => user.auth = false);    //Set the auth field false for the user
        localStorage.setItem("todoListUserData", JSON.stringify(userData));
        window.location.pathname = "/";
    }
    /**** On Click of logout button, take the user to login page ***/

    /**** Add a new todo to the list *****/
    const addTodo = (e) => {
        let todoExists = false;
        todos.forEach(todo => {
            if(todo.value === addInput){ todoExists = true; }
        });
        if(!todoExists && addInput!==""){   //Check if todo already exists or if the input field is empty
            setTodos([...todos, {value: addInput, status: 'pending'}]);
        }
    }
    /**** Add a new todo to the list *****/

    /**** This component handles the todos that were marked finished ***/
    const FinishedTodos = () => {

        /*** Moves the finished todo back to a pending todo ****/
        const handleClick = (e) => {
            let updatedTodos = todos.map((todo,i) => {
                if(todo.value === e.target.parentNode.parentNode.innerText){
                  return {value:todo.value,status:'pending'}
                }
                else{
                  return {value:todo.value,...todo};
                }
            });
            setTodos(updatedTodos);
        }
        /*** Moves the finished todo back to a pending todo ****/

        /**** Deletes finished todo from the list ****/
        const handleDelete = (e) => {
            console.log(e.target.parentNode.parentNode.innerText);
            let updatedTodos = todos.filter(todo => {
                return todo.value !== e.target.parentNode.attributes[0].value
            });
            setTodos(updatedTodos);
        }
        /**** Deletes finished todo from the list ****/

        return todos.map((todo,i) => {
            if(todo.status !== 'pending'){
                return (
                    <div key={i} >
                        <div className="todo-row">
                            <div className="check-icon">
                                <img onClick={handleClick} src={checkIcon}></img>
                                <span>{todo.value}</span>
                            </div>
                            <div onClick={handleDelete} data-id={todo.value} className="del-icon"><img src={deleteIcon}></img></div>
                        </div>
                    </div>
                );
            }
        })
    };
    /**** This component handles the todos that were marked finished ***/

    /*** Html of todo lists ***/
    const todoHtml = (
        <>
            <div className="logout">
                <p onClick={handleLogout}>Logout</p>
            </div>
            <div className="wrapper">
                <div className="titles">
                    Todo List
                </div>
                <div className="list-container">
                    <div className="addItems">
                        <input className="addInput" type="text" placeholder="Add Items" value={addInput} onChange={(e) => setAddInput(e.target.value)} />
                        <div className="plus-icon" onClick={addTodo}><img src={plusIcon}></img></div>
                    </div>
                    <div className="todoList">
                        <TodosList 
                            todos={todos}
                            setTodos={setTodos}
                        />
                    </div>
                    <div className="todoList finished">
                        <FinishedTodos /> 
                    </div>
                </div>
            </div>
        </>
    );
    /*** Html of todo lists ***/

    return (
        <> {isLoading === true ? '' : todoHtml} </>
    )
};
/**** This component displays the Todo list for the specific user *****/

export default TodoList;