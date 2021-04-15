import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";

import Topbar from "./Topbar";
import CognitiveSolution from "../../../CognitiveSolution/CognitiveSolution";
import AIList from "../../../CognitiveSolution/AIList/AIList";
import CIList from "../../../CognitiveSolution/CIList/CIList";
import EIList from "../../../CognitiveSolution/EIList/EIList";
import AWList from "../../../CognitiveSolution/AWList/AWList";
import CWList from "../../../CognitiveSolution/CWList/CWList";
import AIDetailView from "../../../CognitiveSolution/AIDetailView/AIDetailView";
import CIDetailView from "../../../CognitiveSolution/CIDetailView/CIDetailView";
import AWDetailView from "../../../CognitiveSolution/AWDetailView/AWDetailView";
import CWDetailView from "../../../CognitiveSolution/CWDetailView/CWDetailView";
import EIDetailView from "../../../CognitiveSolution/EIDetailView/EIDetailView";
import AIRegistration from '../../../CognitiveSolution/AIRegistration/AIRegistration';
import CIRegistration from '../../../CognitiveSolution/CIRegistration/CIRegistration';
import AWRegistration from '../../../CognitiveSolution/AWRegistration/AWRegistration';
import EIRegistration from '../../../CognitiveSolution/EIRegistration/EIRegistration';
import CWRegistration from '../../../CognitiveSolution/CWRegistration/CWRegistration';
import InternshipList from "../../../CognitiveSolution/InternshipList/InternshipList";
import BatchesList from "../../../CognitiveSolution/BatchesList/BatchesList";
import StudentsList from '../../../CognitiveSolution/StudentsList/StudentsList';
import WorkshopsList from "../../../CognitiveSolution/workshopsList/WorkshopsList";
import WorkshopStudentsList from "../../../CognitiveSolution/WorkshopStudentsList/WorkshopStudentsList";
import SPList from "../../../CodelabSystems/SPList/SPList";
import SPRegistration from "../../../CodelabSystems/SPRegistration/SPRegistration";
import SPDetailView from "../../../CodelabSystems/SPDetailView/SPDetailView";
import CollegeList from "../../../CodelabSystems/CollegeList/CollegeList";
import ProjectsList from "../../../CodelabSystems/ProjectsList/ProjectsList";
import codeLabStudentsList from '../../../CodelabSystems/StudentsList/StudentsList';

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <Route path="/administration/cognitiveSolutions" exact component={CognitiveSolution} />
      <Route path="/administration/cognitiveSolutions/academic_internship" exact component={AIList} />  
      <Route path="/administration/cognitiveSolutions/cognitive_internship" exact component={CIList} />    
      <Route path="/administration/cognitiveSolutions/employee_internship" exact component={EIList} />    
      <Route path="/administration/cognitiveSolutions/academic_workshop" exact component={AWList} />    
      <Route path="/administration/cognitiveSolutions/cognitive_workshop" exact component={CWList} />
      <Route path="/administration/cognitiveSolutions/academic_internship/:id" exact component={AIDetailView} />    
      <Route path="/administration/cognitiveSolutions/cognitive_internship/:id" exact component={CIDetailView} />    
      <Route path="/administration/cognitiveSolutions/academic_workshop/:id" exact component={AWDetailView} />
      <Route path="/administration/cognitiveSolutions/cognitive_workshop/:id" exact component={CWDetailView} />
      <Route path="/administration/cognitiveSolutions/employee_internship/:id" exact component={EIDetailView} />
      <Route path="/administration/cognitiveSolutions/airegister" exact component={AIRegistration} />
      <Route path="/administration/cognitiveSolutions/ciregister" exact component={CIRegistration} /> 
      <Route path="/administration/cognitiveSolutions/awregister" exact component={AWRegistration} /> 
      <Route path="/administration/cognitiveSolutions/eiregister" exact component={EIRegistration} /> 
      <Route path="/administration/cognitiveSolutions/cwregister" exact component={CWRegistration} /> 
      <Route path="/administration/cognitiveSolutions/internshipsList" exact component={InternshipList} />
      <Route path="/administration/cognitiveSolutions/workshopsList" exact component={WorkshopsList} />
      <Route path="/administration/cognitiveSolutions/batchesList/:internshipId" exact component={BatchesList}  />
      <Route path="/administration/cognitiveSolutions/studentsList/:batchId" exact component={StudentsList}  />
      <Route path="/administration/cognitiveSolutions/workshopstudentsList/:workshopId" exact component={WorkshopStudentsList}  />
      <Route path="/administration/codelabSystems/" exact component={SPList} />
      <Route path="/administration/codelabSystems/sp_register/:collegeId" component={SPRegistration} />
      <Route path="/administration/codelabSystems/sp_detail/:id" component={SPDetailView} />
      <Route path="/administration/codelabSystems/collegeWiseList" component={CollegeList} />
      <Route path="/administration/codelabSystems/projectsList/:collegeId" component={ProjectsList} />
      <Route path="/administration/codelabSystems/studentsList/:collegeId/:projectId" component={codeLabStudentsList} />
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
