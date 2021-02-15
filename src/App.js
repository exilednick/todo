import React, {useState, useEffect} from 'react';
import {
 BrowserRouter as Router,
 Switch,
 Route,
 Link,
 useParams
} from "react-router-dom";
import './App.css';
import SignIn from './components/SignIn';
import TodoList from './components/TodoList';
import Projects from './components/Projects';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/projects/todo/:_id'>
          <div className='todo-app'>
          <TodoList/>
          </div>
        </Route>
        <Route path='/projects/:id'>
          <Projects/>
        </Route> 
        <Route path='/'>
          <SignIn/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;