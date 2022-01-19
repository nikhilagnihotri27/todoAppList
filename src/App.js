import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {React} from 'react';
import SignupAndLogin from './components/signupAndLogin';
import TodoList from './components/todoList';
import SmartBanner from 'react-smartbanner';
import '../node_modules/react-smartbanner/dist/main.css';

const App = () => {

  return (
    <div className="App">
      <p>Smart Banner</p>
      <SmartBanner title={'Facebook'} />
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