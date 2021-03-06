import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import './Header.css';

const Header = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  //const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    auth.signOut().then(function () {
      // Sign-out successful.
      console.log("loggedout");
    }).catch((error) => {
      // An error happened.
      //const errorCode = error.code;
      //const errorMessage = error.message;
    });
  };

  if (!user) {
    return (
      <div>
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Crud Api Test</NavbarBrand>  
        </Navbar>

        {!loading && <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Crud Api</NavbarBrand>
          <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/Login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register">Signup</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>}
      </div>
    );
  } else {
    return (
      <div>
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Crud Api</NavbarBrand>  
        </Navbar>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Crud Api</NavbarBrand>
          <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/users">Usuarios</NavLink>
              </NavItem>
            </Nav>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <NavbarText>{user.email} {user.displayName? user.displayName:''} </NavbarText>
              </NavItem>
              <NavItem>
              <Button color="danger" onClick={logout}>Logout</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
};

export default Header;
