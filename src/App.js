import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {React} from 'react';
import SignupAndLogin from './components/signupAndLogin';
import TodoList from './components/todoList';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <SignupAndLogin />
          </Route>
          <Route path="/todos">
            <TodoList />
          </Route>
        </Switch>
      </BrowserRouter> 
    </div>
  );
}

export default App;