import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import { Search } from "../Search/Search";

import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { LayoutContext } from "../../../contexts/LayoutContext";
import { AuthService } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const layoutData = useContext(LayoutContext);
  const { currentUser } = useContext(UserContext);

  const navigator = useNavigate();

  console.log("tutaj");
  console.log(currentUser);

  const handleLogout = () => {
    AuthService.logout();
    navigator("/login");
  };

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      // style={{ backgroundColor: layoutData.topBar.color }}
    >
      <Container>
        <Navbar.Brand>{layoutData.title}</Navbar.Brand>
        <Nav className="ms-auto">
          {/* <LinkContainer to={"/"}>
            <Nav.Link>Strona główna</Nav.Link>
          </LinkContainer>
          <LinkContainer to={"/blog"}>
            <Nav.Link>Blog</Nav.Link>
          </LinkContainer>
          <LinkContainer to={"/about"}>
            <Nav.Link>O nas</Nav.Link>
          </LinkContainer>
          <LinkContainer to={"/about"}>
            <Nav.Link>{userData.name}</Nav.Link>
          </LinkContainer> */}
          <NavDropdown
            title={`Witaj, ${currentUser?.name}`}
            id="basic-nav-dropdown"
          >
            <LinkContainer to={"/admin/profile"}>
              <NavDropdown.Item>Profil</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Wyloguj</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};
