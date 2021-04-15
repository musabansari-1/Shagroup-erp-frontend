import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";

import Topbar from "./Topbar";
// import CognitiveSolution from "../../../CognitiveSolution/CognitiveSolution";
// import AIList from "../../../CognitiveSolution/AIList/AIList";
// import CIList from "../../../CognitiveSolution/CIList/CIList";
// import EIList from "../../../CognitiveSolution/EIList/EIList";
// import AWList from "../../../CognitiveSolution/AWList/AWList";
// import CWList from "../../../CognitiveSolution/CWList/CWList";
// import AIDetailView from "../../../CognitiveSolution/AIDetailView/AIDetailView";
// import CIDetailView from "../../../CognitiveSolution/CIDetailView/CIDetailView";
// import AWDetailView from "../../../CognitiveSolution/AWDetailView/AWDetailView";
// import CWDetailView from "../../../CognitiveSolution/CWDetailView/CWDetailView";
// import EIDetailView from "../../../CognitiveSolution/EIDetailView/EIDetailView";
// import AIRegistration from '../../../CognitiveSolution/AIRegistration/AIRegistration';
// import CIRegistration from '../../../CognitiveSolution/CIRegistration/CIRegistration';
// import AWRegistration from '../../../CognitiveSolution/AWRegistration/AWRegistration';
// import EIRegistration from '../../../CognitiveSolution/EIRegistration/EIRegistration';
// import CWRegistration from '../../../CognitiveSolution/CWRegistration/CWRegistration';
import SPList from '../../../SPList/SPList';
import SPRegistration from '../../../SPRegistration/SPRegistration';
import SPDetailView from '../../../SPDetailView/SPDetailView';

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <Route path="/administration/codelabSystems/sp_register" component={SPRegistration} />
      <Route path="/administration/codelabSystems/sp_detail/:id" component={SPDetailView} />
      <Route path="/administration/codelabSystems" component={SPList} />
      {/* <Route path="/cognitivetemplate" exact component={CognitiveSolution} />
      <Route path="/academic_internship" exact component={AIList} />  
      <Route path="/cognitive_internship" exact component={CIList} />    
      <Route path="/employee_internship" exact component={EIList} />    
      <Route path="/academic_workshop" exact component={AWList} />    
      <Route path="/cognitive_workshop" exact component={CWList} />
      <Route path="/academic_internship/:id" exact component={AIDetailView} />    
      <Route path="/cognitive_internship/:id" exact component={CIDetailView} />    
      <Route path="/academic_workshop/:id" exact component={AWDetailView} />
      <Route path="/cognitive_workshop/:id" exact component={CWDetailView} />
      <Route path="/employee_internship/:id" exact component={EIDetailView} />
      <Route path="/airegister" exact component={AIRegistration} />
      <Route path="/ciregister" exact component={CIRegistration} /> 
      <Route path="/awregister" exact component={AWRegistration} /> 
      <Route path="/eiregister" exact component={EIRegistration} /> 
      <Route path="/cwregister" exact component={CWRegistration} />  */}

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
    </Switch> */}
  </Container>
);

export default Content;
