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
  NavLink
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <a href="/" >
        <img src={cbLogo} alt="" className="Nav__logo"/>
      </a>
      <Navbar className="Nav__bar" light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse className="Nav__items" isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="Nav__link" href="/">
                <p className="Nav__text">About</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="Nav__link" href="/">
                <p className="Nav__text">How it Works</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="Nav__link" href="/">
                <p className="Nav__text">Challenges</p>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;
