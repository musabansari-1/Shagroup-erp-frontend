import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import Topbar from "./Topbar";
import Receipt from '../../../Reciept/Reciept';
import AIList from "../../../AIList/AIList";
import CIList from "../../../CIList/CIList";
import AWList from "../../../AWList/AWList";
import CWList from "../../../CWList/CWList";
import EIList from "../../../EIList/EIList";
import Expenses from "../../../Expenses/Expenses";
import ExpenseList from "../../../Expenses/ExpenseList";
import Statement from "../../../Statement/Statement";
import RecieptList from "../../../Reciept/RecieptList";
import Fees from "../../../Fees/Fees";
import StudentProjects from '../../../SPList/SPList';




const Content = ({ sidebarIsOpen, toggleSidebar, url, path }) => {
  // let {path, url} = useRouteMatch();
  console.log('Path from content', path)
  return (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    {/* <Receipt /> */}
     <Switch>
  <Route path= {`${path}/academic_internship`} exact render={() => <AIList url={url}/>} />  
      <Route path={`${path}/cognitive_internship`} render={() => <CIList url={url}/>} />    
      <Route path= {`${path}/employee_internship`} exact render={() => <EIList url={url}/>} />    
      <Route path={`${path}/academic_workshop`} exact render={() => <AWList url={url}/>} />    
      <Route path={`${path}/cognitive_workshop`} exact render={() => <CWList url={url}/>} />
      <Route path={`${path}/reciept_list/:type/:register_no`} exact component={RecieptList} />
      <Route path={`${path}/reciept_list/:type/:register_no/:id`} exact component={Receipt} />
      {/* <Route path={`${path}/:id`} component={Receipt} /> */}
      <Route path={`${path}/studentProjects`} exact component={StudentProjects} />
      <Route path={`${path}/fees`} exact component={Fees} />
      <Route path={`${path}/add_expenses`} exact component = {() => <Expenses url={url}/>} />
      <Route path={`${path}/expenses`} exact component = {() => <ExpenseList url={url}/>} />
      <Route path={`${path}/statement`} exact component={Statement} /> 
      <Redirect to={`${path}/statement`} />

    </Switch>

     {/* <Switch>
      <Route exact path="/" component={() => "Hello"} />
      <Route exact path="/about" component={() => "About"} />
      <Route exact path="/Pages" component={() => "Pages"} />
      <Route exact path="/faq" component={() => "FAQ"} />
      <Route exact path="/contact" component={() => "Contact"} />
      <Route exact path="/Home-1" component={() => "Home-1"} />
      <Route exact path="/Home-2" component={() => "Home-2"} />
      <Route exact path="/Home-3" component={() => "Home-3"} />
      <Route exact path="/Page-1" component={() => "Page-1"} />
      <Route exact path="/Page-2" component={() => "Page-2"} />
      <Route exact path="/page-1" component={() => "page-1"} />
      <Route exact path="/page-2" component={() => "page-2"} />
      <Route exact path="/page-3" component={() => "page-3"} />
      <Route exact path="/page-4" component={() => "page-4"} />
    </Switch>  */}
  </Container>
  )
};

export default Content;
