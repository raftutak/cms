import { Outlet } from "react-router-dom";
import { LayoutContext } from "../../../contexts/LayoutContext";
import { TopBar } from "../../admin/TopBar/TopBar";
import { UserContext } from "../../../contexts/UserContext";
import { AuthService } from "../../../services/auth.service";
import { Col, Container, Row } from "react-bootstrap";
import { Menu } from "../Menu/Menu";
import { useState } from "react";

export const Layout = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getUser());

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <LayoutContext.Provider value={{ title: "Panel administratora" }}>
        <TopBar />
        <Container className="mt-4 mb-5">
          <Row>
            <Col xs={3}>
              <Menu />
            </Col>
            <Col xs={9}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </LayoutContext.Provider>
    </UserContext.Provider>
  );
};
