import React from 'react'
import About from './Components/About'
import Landing from './Components/Landing'
import {Switch, Route} from 'react-router-dom'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/about' component={About}/>
    </Switch>
)