import { Alert as AlertBootstsrap } from "react-bootstrap";

import styles from "./Alert.module.css";

export const Alert = ({ message, variant }) => {
  return (
    <AlertBootstsrap
      variant={variant}
      className={`${styles.alertOverlay} mt-3 text-center`}
    >
      {message}
    </AlertBootstsrap>
  );
};
