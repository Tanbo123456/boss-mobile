import { HashRouter,Switch,Route } from "react-router-dom";
// import Cookie from "js-cookie";

import Login from "./containers/login/login";
import Register from "./containers/register/register";
import Main from "./containers/main/main";

import './app.less'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/' component={Main}/>
      </Switch>
    </HashRouter>
  );
}

export default App;
