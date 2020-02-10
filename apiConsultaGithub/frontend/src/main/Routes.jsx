import React from 'react'
import { Switch, Route} from 'react-router'


import Search from '../components/search/Search'


export default props =>
    <Switch>
        <Route path='/search' component={Search}/>
    </Switch>