import React, { useState } from 'react';
import axios from '../../axios';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';
import './Navbar.css';
import Axios from 'axios';
import {useHistory, Redirect} from 'react-router-dom';

const Navigationbar = (props) => {
  const history = useHistory()
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logoutHandler = () => {
    axios.post("rest-auth/logout/")
    localStorage.removeItem('token');
    history.push('/')
    window.location.reload();
  }

  return (
    <div className="navigationBar"  style={{marginLeft: 'auto'}}>
      {/* <Navbar style={{backgroundColor: 'green', color: 'white' }} dark  expand="md">
        <NavbarBrand style={{color: 'white'}} href="/">Dataqueue Systems</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar> */}
          <Nav   className="ml-auto " navbar>
          {/* <form >
              <InputGroup className="no-border search">
                <Input  placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              </form> */}
            {/* <NavItem  style={{background: 'none'}}>
              <NavLink   href="/components/">Components</NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink className = "navlinks" href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem> */}
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            <UncontrolledDropdown>
              <DropdownToggle nav caret>
              <i className="fa fa-user-circle-o"  aria-hidden="true"></i>
              {/* <i class="fa fa-user" aria-hidden="true"></i> */}
              {/* <i class="fas fa-sign-out-alt" aria-hidden="true"></i> */}
              </DropdownToggle>
              <DropdownMenu right className="dropdown__menu">
                <DropdownItem onClick={logoutHandler} className="dropdown__item">
                  Logout
                </DropdownItem>
                {/* <DropdownItem onClick={logoutHandler} className="dropdown__item">
                  Logout
                </DropdownItem> */}
                {/* <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar> */}
    </div>
  );
}

export default Navigationbar;