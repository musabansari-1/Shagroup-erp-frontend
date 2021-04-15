import React from 'react';
import './App.css';
import {BrowserRouter,  Route, Switch, Redirect } from "react-router-dom";
import Navigationbar from './components/Navbar/Navbar';
import Sidebar from './modules/administration/sidebar/sidebar';
import Home from './components/Home/Home';
import Administration from './modules/administration/mainPage/Administration';
import Login from './components/Login/Login';
import CognitiveSolution from './modules/administration/CognitiveSolution/CognitiveSolution';
import AIList from './modules/administration/CognitiveSolution/AIList/AIList';
// import Reciept from './modules/accounts/Reciept/Reciept';
import accounts from './modules/accounts/sidebar/sidebar';
import codelab from './modules/administration/CodelabSystems/sidebar/sidebar';


function App() {

  const PrivateRoute = ({ component, path}) => {
    // localStorage.removeItem('token');
    return (
      localStorage.getItem('token') !== null 
       ? <Route path={path} component={component} />
      : 
      <Login />
    )
  }

  return (
    <BrowserRouter>
    <div className="App">
      {/* <Navigationbar /> */}
      {/* <Sidebar /> */}
     <Switch>
        <PrivateRoute path="/administration" exact component={Administration} />
        <PrivateRoute path="/administration"  component={Sidebar} />
        <PrivateRoute path="/administration/codelabSystems"  component= {codelab} />
        <PrivateRoute path="/accounts" component={accounts} />
        <Route path="/" exact component={Home} />
        {/* <Route path="/ailist" exact component={AIList} /> */}
        {/* <Route path="/reciept" exact component={Reciept} /> */}
        {/* <Redirect to="/cognitivetemplate " /> */}
        {/* <Route path="/form" exact  */}
     </Switch>           
    </div>
    </BrowserRouter>
  );
}

export default App;
