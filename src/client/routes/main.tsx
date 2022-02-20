import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './private'
import mainRoutes from '../config/mainRoutes'
import Homepage from '../pages/homepage'
import Profile from '../pages/profile'
import NotFound from '../pages/notFound'

const Main=()=>(
    <Router>
        <Switch>
            <Route path={mainRoutes.home} exact component={Homepage}/>
            <PrivateRoute path={mainRoutes.private.profile.main} exact component={Profile}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
)
export default Main