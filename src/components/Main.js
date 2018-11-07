import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './landing/Landing';
import Login from './login/Login';
import Signup from './signup/Signup';
import Listings from './listings/Listings';
import Post from './post/Post';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Landing}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/listings' component={Listings}/>
      <Route path='/post' component={Post}/>
    </Switch>
  </main>
)

export default Main
