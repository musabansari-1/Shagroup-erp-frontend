import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
  faAddressCard,
  faUserGraduate,
  faChalkboardTeacher,
  faSchool,
  faLaptopCode,
  faUser,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav, Collapse } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import SubMenu from "./SubMenu";

const SideBar = ({ isOpen, toggle }) => {
  const cognitive = 0;
  const internship = 1;
  const workshop = 2;

  const codelabs = 3;

  const [CognitiveCollapsed, setCognitiveCollapsed] = useState(true);
  const [InternshipCollapsed, setInternshipCollapsed] = useState(true);
  const [WorkshopCollapsed, setWorkshopCollapsed] = useState(true);
  const [CodelabsCollapsed, setCodelabsCollapsed] = useState(true);

  const toggleMenu = (menu) => {
    switch (menu){
      case cognitive: setCognitiveCollapsed(!CognitiveCollapsed);
      break;
      case internship: setInternshipCollapsed(!InternshipCollapsed);
      break;
      case workshop: setWorkshopCollapsed(!WorkshopCollapsed);
      break;
      case codelabs: setCodelabsCollapsed(!CodelabsCollapsed);
      break;
      default:
    }
    
  }
  return (
  // <MenuBar />
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h2 style={{ fontWeight: "800" }}>
        SHA <br />
        GROUP
      </h2>
      {/* <img width="90%" height="120px" style={{padding: '10px'}} src="data:image/png;base64,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"/> */}
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        {/*sidebar start */}


        <div>
          {/* 1st level menu */}
      <NavItem
        onClick={() => toggleMenu(cognitive)}
        className={classNames({ "menu-open": !CognitiveCollapsed})}
        className = {"pl-0"}
      >
        <NavLink className="dropdown-toggle">
          <FontAwesomeIcon icon={faCopy}  />
          cognitive solution
        </NavLink>
      </NavItem>
      <Collapse
        isOpen={!CognitiveCollapsed}
        
        className={classNames("items-menu", { "mb-1": !CognitiveCollapsed })}
      >
      <div>
       {/* 2nd level menu  */}
      <NavItem
        onClick={() => toggleMenu(internship)}
        className={classNames({ "menu-open": !InternshipCollapsed})}
        className = {"pl-2"}
      >
        <NavLink className="dropdown-toggle">
          <FontAwesomeIcon icon={faCopy}  />
          Internship
        </NavLink>
      </NavItem>
      <Collapse
        isOpen={!InternshipCollapsed}
        
        className={classNames("items-menu", { "mb-1": !InternshipCollapsed })}
      >
        {/* 3rd level menu */}
              <NavItem
              className="pl-4"
              >
          <NavLink tag={Link} to={"/administration/cognitiveSolutions/academic_internship"}>
            <FontAwesomeIcon icon={faQuestion}  />
            Academic Internship
          </NavLink>
        </NavItem>
        <NavItem
        className="pl-4"
        >
        <NavLink tag={Link} to={"/administration/cognitiveSolutions/cognitive_internship"}>
            <FontAwesomeIcon icon={faQuestion}  />
            Cognitive Internship 
          </NavLink>
        </NavItem>
        <NavItem
        className="pl-4"
        >
        <NavLink tag={Link} to={"/administration/cognitiveSolutions/employee_internship"}>
            <FontAwesomeIcon icon={faQuestion}  />
            Employee Internship
          </NavLink>
        </NavItem>
      </Collapse>
        </div>
        <div>
       {/* 2nd level menu  */}
      <NavItem
        onClick={() => toggleMenu(workshop)}
        className={classNames({ "menu-open": !WorkshopCollapsed})}
        className = {"pl-2"}
      >
        <NavLink className="dropdown-toggle">
          <FontAwesomeIcon icon={faCopy}  />
          Workshops
        </NavLink>
      </NavItem>
      <Collapse
        isOpen={!WorkshopCollapsed}
        
        className={classNames("items-menu", { "mb-1": !WorkshopCollapsed })}
      >
        {/* 3rd level menu */}
              <NavItem
              className="pl-4"
              >
          <NavLink tag={Link} to={"/administration/cognitiveSolutions/academic_workshop"}>
            <FontAwesomeIcon icon={faQuestion}  />
            Academic Workshop
          </NavLink>
        </NavItem>
        <NavItem
        className="pl-4"
        >
        <NavLink tag={Link} to={"/administration/cognitiveSolutions/cognitive_workshop"}>
            <FontAwesomeIcon icon={faQuestion}  />
            Cognitive Workshop 
          </NavLink>
        </NavItem>
      </Collapse>
        </div>
        <NavItem
         className = {"pl-2"}
        >
          <NavLink tag={Link} to={"/administration/cognitiveSolutions/internshipsList"}>
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            Internship Batches
          </NavLink>
        </NavItem>
        <NavItem
        className = {"pl-2"}
        >
          <NavLink tag={Link} to={"/administration/cognitiveSolutions/workshopsList"}>
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            Workshop Batches
          </NavLink>
        </NavItem>
      </Collapse>  
        </div>


        <div>
          {/* 1st level menu */}
      <NavItem
        onClick={() => toggleMenu(codelabs)}
        className={classNames({ "menu-open": !CodelabsCollapsed})}
        className = {"pl-0"}
      >
        <NavLink className="dropdown-toggle">
          <FontAwesomeIcon icon={faCopy}  />
          codelab system
        </NavLink>
      </NavItem>
      <Collapse
        isOpen={!CodelabsCollapsed}
        
        className={classNames("items-menu", { "mb-1": !CodelabsCollapsed })}
      >
      <NavItem
      className = {"pl-2"}
      >
        {/*change the url of student project */}
          <NavLink tag={Link} to={"/administration/codelabSystems/"}>
            <FontAwesomeIcon icon={faQuestion}/>
            Student Project
          </NavLink>
        </NavItem>
        <NavItem
      className = {"pl-2"}
      >
        {/*change the url of student project */}
          <NavLink tag={Link} to={"/administration/codelabSystems/collegeWiseList"}>
            <FontAwesomeIcon icon={faQuestion}/>
            Student Project
          </NavLink>
        </NavItem>  
      </Collapse>
      </div>
      
       
      </Nav>
    </div>
  </div>
);
      }
const submenus = [
  [
    {
      title: "Home 1",
      target: "Home-1",
    },
    {
      title: "Home 2",
      target: "Home-2",
    },
    {
      itle: "Home 3",
      target: "Home-3",
    },
  ],
  [
    {
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
  ],
  [
    {
      title: "Academic Internship",
      target: "/administration/cognitiveSolutions/academic_internship",
      children:
        [
          {
            title: "sub sub menu",
            target: "bale bale"
          }
        ] 
    },
    {
      title: "Cognitive Internship",
      target: "/administration/cognitiveSolutions/cognitive_internship",
    },
    {
      title: "Employee Internship",
      target: "/administration/cognitiveSolutions/employee_internship",
    },
  ],
  [
    {
      title: "Academic Workshop",
      target: "/administration/cognitiveSolutions/academic_workshop",
    },
    {
      title: "Cognitive Workshop",
      target: "/administration/cognitiveSolutions/cognitive_workshop",
    },
  ],
];

// const submenus = [
//   [
//     {
//       title: "Home 1",
//       target: "Home-1",
//     },
//     {
//       title: "Home 2",
//       target: "Home-2",
//     },
//     {
//       itle: "Home 3",
//       target: "Home-3",
//     },
//   ],
//   [
//     [
//       {
//         title: "Academic Internship",
//         target: "/administration/cognitiveSolutions/academic_internship",
//       },
//       {
//         title: "Cognitive Internship",
//         target: "/administration/cognitiveSolutions/cognitive_internship",
//       },
//     ],
//     [
//       {
//         title: "Employee Internship",
//         target: "/administration/cognitiveSolutions/employee_internship",
//       },
//     ],
//   ],
//   [
//     {
//       title: "Academic Internship",
//       target: "/administration/cognitiveSolutions/academic_internship",
//     },
//     {
//       title: "Cognitive Internship",
//       target: "/administration/cognitiveSolutions/cognitive_internship",
//     },
//     {
//       title: "Employee Internship",
//       target: "/administration/cognitiveSolutions/employee_internship",
//     },
//   ],
//   [
//     {
//       title: "Academic Workshop",
//       target: "/administration/cognitiveSolutions/academic_workshop",
//     },
//     {
//       title: "Cognitive Workshop",
//       target: "/administration/cognitiveSolutions/cognitive_workshop",
//     },
//    ],
// ];


export default SideBar;
