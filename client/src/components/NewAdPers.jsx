import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import bg from "../components/background/bg.mp4";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { adupload, getCities, insertads } from "./getData.js";
import { getSubCateg } from "./getData.js";
import { useQuery } from "react-query";
import { Modaladup } from "./Modaladup";
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
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

export const NewAdPers = ({
  loggedInUser,
  setLoggedInUser,
  selectedCategId,
}) => {
  const [selCity, setSelCity] = useState({ id: 0, name: "" });
  const [selSubCateg, setSelSubCateg] = useState(0);
  const [id, setId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const toggle = () => setIsOpen(!isOpen);
  const [admodal, setAdModal] = useState(false);
  
  const [contact,setContact] = useState("")
  const[about,setAboutme] = useState("")

  const toggleAdModal = () => {
  let newItem={user_id:loggedInUser.id,about_me:about,subcateg_id:selSubCateg,contact}
  adupload(newItem)
  setAdModal(!admodal)};

  const { data: dataCities, status: statusCities } = useQuery(
    "cities",
    getCities
  );
  //statusCities == "success" && console.log(dataCities.data);


  const { data: dataSubCateg, status: statusSubCateg } = useQuery(
    ["subCategs", id],
    getSubCateg
  );
  statusSubCateg == "success" && console.log(dataSubCateg.data);

  const handleSelectSubCateg = (event) => {
    setSelSubCateg(event.target.value);
    console.log(event.target.value);
  };

  const handleSelect = (event) => {
    //console.log(event.target.id,event.target.name)
    let selectedName = event.target.options[event.target.selectedIndex].text;
    console.log(selectedName);
    setSelCity({ id: event.target.value, name: selectedName });
    //console.log("Klikk volt", event.target);
    //console.log(event.target.value);
  };

  const handleUpdateAvatar = () => {
    const formdata = new FormData();
    /*formdata.append("selFile", selFile)*/
    formdata.append("username", loggedInUser.username);
    formdata.append("avatar_id", loggedInUser.avatar_id);
    /*setIsUploading(true)
    mutationAvatar.mutate(formdata)*/
  };

  const backClick = () => {
    navigate("/hirdetes-feladas");
  };

  const handleinsert = () => {
    console.log('handleinsert: ',about,selCity.id,selSubCateg,loggedInUser.id)
    const formdata=new FormData()
    formdata.append('description',about)
    formdata.append('user_id',loggedInUser.id)
    formdata.append('subcateg_id',selSubCateg)
    formdata.append('city_id',selCity.id)
    insertads(formdata)
    setAdModal(true)
  }

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
              <NavLink to="/kezdolap" className="nav-link">
                Főoldal
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/rolunk" className="nav-link">
                Rólunk
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/hirdetesek" className="nav-link">
                Hirdetések
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="/hirdetes-feladas"
                className="nav-link active"
                aria-current="page"
              >
                Hirdetésfeladás
              </NavLink>
            </NavItem>
            {loggedInUser?.role == "admin" && (
              <NavItem>
              <NavLink to="/adminpanel" className="nav-link">
                Admin Panel
              </NavLink>
            </NavItem>
            )}
          </Nav>

          {loggedInUser?.username ? (
            <Nav navbar>
              <NavItem className="nav-link d-flex align-items-center">
                <NavLink to="/profil" className="nav-link">
                  <img
                    src={loggedInUser.avatar}
                    className="avatar"
                    alt="Avatar"
                    style={{ width: "30px", marginRight: "20px" }}
                  />
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
      <div className="container">
        <h1 className="sitetitle p-3 text-white text-center">
          Hirdetés Magánszemélyként
        </h1>
        <div className="row justify-content-center">
          <Form className="text-center formlog adform border p-3 shadow mt-1 rounded">
            <h3>Hirdetési adatlap</h3>
            <FormGroup>
              <Label for="username">Város</Label>
              <Input
                className="legorduloelemek"
                type="select"
                name="select"
                id="selectedCity"
                onChange={handleSelect}
              >
                <option value="0">Válassz várost...</option>
                {statusCities == "success" &&
                  dataCities.data.map((obj) => (
                    <option
                      key={obj.id}
                      id={obj.id}
                      value={obj.id}
                      name={obj.name}
                    >
                      {obj.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="password">Munkakör</Label>
              <Input
                className="legorduloelemek"
                type="select"
                name="select"
                data-test="test"
                id="test"
                onChange={handleSelectSubCateg}
              >
                <option value="0">Válassz munkakört...</option>
                {statusSubCateg == "success" &&
                    dataSubCateg.data.map((obj) => (
                      <option key={obj.id} id={obj.id} value={obj.id}>
                        {obj.description}
                      </option>
                    ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Leírás</Label>
              <Input
                type="textarea"
                maxlength="365"
               
                value={about}
                onChange={(event)=>setAboutme(event.target.value)}
              ></Input>
            </FormGroup>

            <div>
            <input
                    type="button"
                    value="Feltöltés"
                    data-toggle="modal"
                    onClick={handleinsert}
                    className="btn btn-primary bejelentkezes"
                  />
            <input 
                    type="button" 
                    value="Vissza"
                    onClick={backClick}
                    className="btn btn-danger mt-2 bejelentkezes"
                  />
            </div>
          </Form>
        </div>
      </div>
      <footer>
        <div className="row">
          <div className="col-md-4">
            <a target="_blank" href="https://github.com/adamblgh/Specialistlab">
              <i class="fa-brands fa-2xl fa-github"></i>
            </a>
            <a target="_blank" href="https://hu-hu.facebook.com/">
              <i class="fa-brands fa-2xl fa-facebook"></i>
            </a>
            <a target="_blank" href="https://www.instagram.com/">
              <i class="fa-brands fa-2xl fa-instagram"></i>
            </a>
          </div>
          <div className="col-md-4 d-flex mid justify-content-center align-items-center ">
            <img
              className="img-fluid footerlogo mr-3"
              src="slab_logo.png"
              alt="Logo"
            />
            <span>SPECIALIST LAB™</span>
          </div>
          <div className="col-md-4 d-flex align-items-center end">
            <div>Hungary @2023</div>
          </div>
        </div>
      </footer>
      {admodal && <Modaladup admodal={admodal} setAdModal={setAdModal} />}
    </>
  );
};
