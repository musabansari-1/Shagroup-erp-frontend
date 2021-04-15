import React, { useState } from "react";
import classNames from "classnames";
import { Collapse, NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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

// let size = 0;

const SubMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  const { icon, title, items, size = 0 } = props;
  // console.log('items', items);
  // size += 2;
  let sizeText = 'pl-' + size;
  console.log('main' + sizeText)
  return items.map(
    (item) => {
      if (item.children) {
        console.log('children exist for ' + item.title);
        return(
          <div>
      <NavItem
        onClick={toggle}
        className={classNames({ "menu-open": !collapsed})}
        className = {sizeText}
      >
        <NavLink className="dropdown-toggle">
          <FontAwesomeIcon icon={faCopy}  />
          {item.title}
        </NavLink>
      </NavItem>
      <Collapse
        isOpen={!collapsed}
        navbar
        className={classNames("items-menu", { "mb-1": !collapsed })}
      >
 <SubMenu title={item.title} icon={faAddressCard} items={item.children} size={size+2} />
      </Collapse>
       
        </div>
        )      
      }
      let st = 'pl-' + (size + 1);
      console.log('sub' + st + ' '+ item.title);
      return (
        <NavItem className={st}>
            <NavLink tag={Link} to={item.target}>
            <FontAwesomeIcon icon={faCopy}/>
              {item.title}
            </NavLink>
            <Collapse
        isOpen={!collapsed}
        navbar
        className={classNames("items-menu", { "mb-1": !collapsed })}
      >
      </Collapse>
          </NavItem>
      )

    }
  )
  
//   return (
//     <div>
//       <NavItem
//         onClick={toggle}
//         className={classNames({ "menu-open": !collapsed})}
//         className = {sizeText}
//       >
//         <NavLink className="dropdown-toggle">
//           <FontAwesomeIcon icon={faCopy}  />
//           {title}
//         </NavLink>
//       </NavItem>
//       <Collapse
//         isOpen={!collapsed}
//         navbar
//         className={classNames("items-menu", { "mb-1": !collapsed })}
//       >
//         {items.map((item, index) => {
//           console.log(item.title);
//           if (item.children) {
//             return <SubMenu title={item.title} icon={faAddressCard} items={item.children} size={size+2} />
//             console.log('children exist');
//           } 
//           let st = 'pl-' + (size + 2);
//           console.log('sub' + st);
//           // if (items.length -1 === index) { 
//           //   // size = 0;
//           //   console.log('reset')
//           // }
//           return(
//           <NavItem key={index} className={st}>
//             <NavLink tag={Link} to={item.target}>
//             <FontAwesomeIcon icon={faCopy}/>
//               {item.title}
//             </NavLink>
//             <Collapse
//         isOpen={!collapsed}
//         navbar
//         className={classNames("items-menu", { "mb-1": !collapsed })}
//       >
//       </Collapse>
//           </NavItem>
//           )
// })
// }



//       </Collapse>
//     </div>
//   );
};



export default SubMenu;
