import { useContext } from "react";

import { LayoutContext } from "../../../contexts/LayoutContext";

import styles from "./Footer.module.css";

export const Footer = () => {
  const layoutData = useContext(LayoutContext);
  const { footer } = layoutData.site;

  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>{footer}</div>
    </div>
  );
};
