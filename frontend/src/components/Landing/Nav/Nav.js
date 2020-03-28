import React, { useState } from 'react';
import './Nav.scss';
import cbLogo from '../../../assets/imgs/cb-logo.svg';
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
  NavbarText
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="Nav__bar" light expand="md">
      <NavbarBrand href="/">
        <img src={cbLogo} alt="" className="Nav__logo"/>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse className="Nav__items" isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink className="Nav__link" href="/">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="Nav__link" href="/">How it Works</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="Nav__link" href="/">Challenges</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default Example;