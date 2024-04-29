import { useContext } from "react";
import { NavLink } from "react-router-dom"; // Import from react-router-dom
import { LayoutContext } from "../../../contexts/LayoutContext";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Search } from "../Search/Search";

export const TopBar = () => {
  const layoutData = useContext(LayoutContext);
  const menuItems = JSON.parse(layoutData.site.menu);

  console.log(menuItems);

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className="nav-link">
            {layoutData.site.title}
          </NavLink>{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {menuItems.map((dropdown) => {
              if (dropdown.active)
                return (
                  <NavDropdown key={dropdown.menuId} title={dropdown.menuName}>
                    {dropdown.links.map((link) => (
                      <NavDropdown.Item key={link.id}>
                        <NavLink to={`/${link.path}`} className="nav-link">
                          {link.name}
                        </NavLink>
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                );
            })}
            <NavLink key="blog" to="blog" className="nav-link">
              Blog
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <Search />
      </Container>
    </Navbar>
  );
};
