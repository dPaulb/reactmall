import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './routes/Home';
import Header from './routes/Header';
import Join from './routes/Join';
import Login from './routes/Login';
import NotMatch from './routes/NotMatch';
import Post from './routes/Post';
import WriteForm from './Components/WriteForm';
import Detail from './routes/Detail';
import Modify from './Components/Modify';
import Chat from './Components/Chat';

class App extends Component {
  render() {
    return (
      <Router>
          <div className="container">
        <Header/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/member/join" component={Join}/>
            <Route path="/member/login" component={Login}/>
            <Route exact path="/post" component={Post}/>
            <Route path="/post/form" component={WriteForm}/>
            <Route path="/post/detail/:id" component={Detail}/>
            <Route path="/post/modify/:id" component={Modify}/>
            {/* <Route path="/chat" component={Chat}/> */}
            <Route component={NotMatch}/>
          </Switch>
          </div>
        </Router>
    )
  }
}

export default App;
