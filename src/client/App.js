import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Login from './login'
import SignUp from './signUp'
import Sayfa from './sayfa'


export default function App () {
return(
  <BrowserRouter>
    <div>
      <Switch>
        <Route path={'/signUp'} component={SignUp} />
        <Route path={'/sayfa'} component={Sayfa}/>
        <Route path={'/'} component={Login}/>
      </Switch>
    </div>
  </BrowserRouter>
)
}
