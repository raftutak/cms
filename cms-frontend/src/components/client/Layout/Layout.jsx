import { LayoutContext } from "../../../contexts/LayoutContext";
import { Footer } from "../Footer/Footer";
import { TopBar } from "../TopBar/TopBar";
import { Outlet, useLoaderData } from "react-router-dom";

import styles from "./Layout.module.css";

export const Layout = () => {
  const loader = useLoaderData();
  const layoutData = loader.site.data;

  return (
    <LayoutContext.Provider value={layoutData}>
      <div className={styles.mainContainer}>
        <TopBar />
        <Outlet />
        <Footer />
      </div>
    </LayoutContext.Provider>
  );
};
