import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import bg from "../components/background/bg.mp4";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
} from 'reactstrap';

export const AdUpload=({loggedInUser,setLoggedInUser})=> {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleUpdateAvatar = () => {
    const formdata = new FormData()
    /*formdata.append("selFile", selFile)*/
    formdata.append("username", loggedInUser.username)
    formdata.append("avatar_id", loggedInUser.avatar_id)
    /*setIsUploading(true)
    mutationAvatar.mutate(formdata)*/
  };


  const navigate = useNavigate();
  return (
    <>
    <video
        autoPlay
        loop
        muted
        style={{
          zIndex: "-1",
        }}
      >
        <source src={bg} type="video/mp4" />
      </video>
    <Navbar expand="sm" light color='light' fixed='top'>
        <NavbarBrand>
            <img className='img-fluid' style={{width:"35px",height:"35px"}} alt='SpecialistLab_Logo' src='slab_logo.png'></img>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink to='/kezdolap' className="nav-link">Főoldal</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/rolunk' className="nav-link">Rólunk</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/hirdetesek' className="nav-link">Hirdetések</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/hirdetes-feladas' className="nav-link active" aria-current="page">Hirdetésfeladás</NavLink>
            </NavItem>
            {loggedInUser?.role == "admin" && (
              <NavItem>
              <NavLink to="/adminpanel" className="nav-link">
                Admin Panel
              </NavLink>
            </NavItem>
            )}

            </Nav>

            {loggedInUser?.username?
            (
            <Nav navbar>
            <NavItem className="nav-link d-flex align-items-center">
              <NavLink to="/profil" className="nav-link">
              <img src={loggedInUser.avatar} className="avatar" alt="Avatar" style={{width:"30px",marginRight:"20px"}} />
              <span style={{cursor:"pointer"}}>{loggedInUser.username}</span>
              </NavLink>
          </NavItem>
          <NavItem className='d-flex align-items-center'>
            <NavLink to="/">
            <span className='btn text-info' onClick={()=>setLoggedInUser({})}>Kijelentkezés</span>
            </NavLink>
          </NavItem>
            </Nav>
            )
            :
            (
            <Nav navbar>
          <NavItem>
            <NavLink to="/login" className="nav-link">Bejelentkezés</NavLink>
          </NavItem>
            </Nav>)
          }
        </Collapse>
      </Navbar>
      <div className="container">
      <h1 className='sitetitle p-3 text-white text-center homekateg'>Hogyan szeretne hirdetni?</h1>
      <br />
      <div className="row aduploadpanel">                             {/*1200px-nél egybeugrik + 992px-nél is összeugrik + mobilnál az utolsó belelóg a footerbe */}
        <div className="col-md-6">
        <motion.div
                style={{marginRight:5,minWidth:250}}
                whileHover={{ scale: [null, 1.08] }}
                transition={{ duration: 1 }}
                onClick={() => navigate("/ceghirdetes")}
                className="panel lineUp text-center p-3 mt-1 rounded ceg"
              >
                <h3 className="text-center hirdetesfel">Cégként</h3>
              </motion.div>
        </div>
        <div className="col-md-6">
        <motion.div
                style={{marginRight:5,minWidth:250}}
                whileHover={{ scale: [null, 1.08] }}
                transition={{ duration: 1 }}
                onClick={() => navigate("/maganhirdetes")}
                className="panel text-center lineUp p-3 mt-1 rounded magan"
              >
                <h3 className="hirdetesfel text-center">Magánszemélyként</h3>
              </motion.div>
        </div>
      </div>
    </div>
    <footer>
        <div className="row">
          <div className="col-md-4 mt-2">
              <a target="_blank" href="https://github.com/adamblgh/Specialistlab"><i class="fa-brands fa-2xl fa-github"></i></a>
              <a target="_blank" href="https://hu-hu.facebook.com/"><i class="fa-brands fa-2xl fa-facebook"></i></a>
              <a target="_blank" href="https://www.instagram.com/"><i class="fa-brands fa-2xl fa-instagram"></i></a>

          </div>
          <div className="col-md-4 d-flex mid justify-content-center align-items-center ">
            <img className="img-fluid footerlogo mr-3" src="slab_logo.png" alt="Logo" />
            <span>SPECIALIST LAB™</span>
          </div>
          <div className="col-md-4 d-flex align-items-center end">
          <div>Hungary @2023</div>
          </div>
        </div>
      </footer>
    </>
  );
}