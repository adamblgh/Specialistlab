import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

export const Ad = ({ loggedInUser, setLoggedInUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div>
        <Navbar expand="sm" light color="light" fixed="top">
          <NavbarBrand>
            <img
              className="img-fluid"
              style={{ width: "35px", height: "35px" }}
              alt="SpecialistLab_Logo"
              src="slab_logo.png"
            ></img>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink to="/home" className="nav-link">
                  Főoldal
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about" className="nav-link">
                  Rólunk
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/ad"
                  className="nav-link active"
                  aria-current="page"
                >
                  Hirdetések
                </NavLink>
              </NavItem>
              {loggedInUser?.role == "admin" && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Admin Panel
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>Users</DropdownItem>
                    <DropdownItem>Products</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <NavItem>
                        <NavLink to="books">Books</NavLink>
                      </NavItem>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>

            {loggedInUser?.username ? (
              <Nav navbar>
                <NavItem className="nav-link d-flex align-items-center">
                  <NavLink to="/profile" className="nav-link">
                    {/*<img src={loggedInUser.avatar} alt="Avatar" style={{width:"20px",marginRight:"10px"}} />*/}
                    <span style={{ cursor: "pointer" }}>
                      {loggedInUser.username}
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem className="d-flex align-items-center">
                  <NavLink to="/">
                    <span
                      className="btn text-info"
                      onClick={() => setLoggedInUser({})}
                    >
                      Kijelentkezés
                    </span>
                  </NavLink>
                </NavItem>
              </Nav>
            ) : (
              <Nav navbar>
                <NavItem>
                  <NavLink to="/login" className="nav-link">
                    Bejelentkezés
                  </NavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Navbar>
      </div>
      {/*<div className="container">
        <h1 className="text-center">Hirdetések</h1>
        <div className="hirdetesek">
          <div class="card text-center">
            <div class="card-header">Munkakör</div>
            <div class="card-body">
              <h5 class="card-title">Hely</h5>
              <p class="card-text">
                Ide jön a leírás
              </p>
              <a href="#" class="btn btn-primary">
                Érdekel
              </a>
            </div>
            <div class="card-footer text-muted">Dátum</div>
          </div>
        </div>
        </div>*/}
    </>
  );
};