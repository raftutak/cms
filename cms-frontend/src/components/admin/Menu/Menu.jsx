import { Collapse, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation } from "react-router-dom";

import styles from "./Menu.module.css";
import { useEffect, useState } from "react";
import { AuthService } from "../../../services/auth.service";

export const Menu = () => {
  const [openPosts, setOpenPosts] = useState(false);
  const [openPages, setOpenPages] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const location = useLocation();

  const localStorageData = AuthService.getUser();

  useEffect(() => {
    setOpenPosts(
      location.pathname.includes("/admin/posts") ||
        location.pathname.includes("/admin/add-post")
    );
    setOpenPages(
      location.pathname.includes("/admin/pages") ||
        location.pathname.includes("/admin/add-page")
    );
    setOpenCategories(
      location.pathname.includes("/admin/categories") ||
        location.pathname.includes("/admin/add-category")
    );
    setOpenUsers(
      location.pathname.includes("/admin/users") ||
        location.pathname.includes("/admin/add-user")
    );
  }, [location]);

  return (
    <>
      <div className="flex-column">
        <ul className={`${styles.menu} list-group list-group-flush`}>
          <li className="list-group-item">
            <LinkContainer to={"/admin"}>
              <Nav.Link>Strona główna</Nav.Link>
            </LinkContainer>
          </li>

          <li className="list-group-item">
            <Nav.Link onClick={() => setOpenPosts(!openPosts)}>Wpisy</Nav.Link>
            <Collapse in={openPosts}>
              <div className={styles.submenu}>
                <LinkContainer to={"/admin/posts"}>
                  <Nav.Link>Wszystkie wpisy</Nav.Link>
                </LinkContainer>

                <LinkContainer to={"/admin/add-post"}>
                  <Nav.Link>Dodaj wpis</Nav.Link>
                </LinkContainer>
              </div>
            </Collapse>
          </li>

          <li className="list-group-item">
            <Nav.Link onClick={() => setOpenPages(!openPages)}>Strony</Nav.Link>
            <Collapse in={openPages}>
              <div className={styles.submenu}>
                <LinkContainer to={"/admin/pages"}>
                  <Nav.Link>Wszystkie strony</Nav.Link>
                </LinkContainer>

                <LinkContainer to={"/admin/add-page"}>
                  <Nav.Link>Dodaj stronę</Nav.Link>
                </LinkContainer>
              </div>
            </Collapse>
          </li>

          <li className="list-group-item">
            <Nav.Link onClick={() => setOpenCategories(!openCategories)}>
              Kategorie
            </Nav.Link>
            <Collapse in={openCategories}>
              <div className={styles.submenu}>
                <LinkContainer to={"/admin/categories"}>
                  <Nav.Link>Wszystkie kategorie</Nav.Link>
                </LinkContainer>
                <LinkContainer to={"/admin/add-category"}>
                  <Nav.Link>Dodaj kategorię</Nav.Link>
                </LinkContainer>
              </div>
            </Collapse>
          </li>

          {localStorageData?.role === "ADMINISTRATOR" && (
            <li className="list-group-item">
              <Nav.Link onClick={() => setOpenUsers(!openUsers)}>
                Użytkownicy
              </Nav.Link>
              <Collapse in={openUsers}>
                <div className={styles.submenu}>
                  <LinkContainer to={"/admin/users"}>
                    <Nav.Link>Wszyscy użytkownicy</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={"/admin/add-user"}>
                    <Nav.Link>Dodaj użytkownika</Nav.Link>
                  </LinkContainer>
                </div>
              </Collapse>
            </li>
          )}

          {localStorageData?.role === "ADMINISTRATOR" && (
            <li className="list-group-item">
              <LinkContainer to={"/admin/settings"}>
                <Nav.Link>Ustawienia strony</Nav.Link>
              </LinkContainer>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
