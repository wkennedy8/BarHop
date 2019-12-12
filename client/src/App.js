import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import BarsList from './pages/BarsList'
import SingleBar from './pages/SingleBar'


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/bars/:location/:term?" component={BarsList}/>
      <Route path="/bar/:id" component={SingleBar}/>
    </Switch>
  </BrowserRouter>
)

export default App
