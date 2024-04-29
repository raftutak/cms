import { Link } from "react-router-dom";

export const ResetPasswordSuccess = () => {
  return (
    <>
      <p className="mt-4 text-center">
        Hasło zostało pomyślnie zresetowane. Możesz się teraz zalogować.
      </p>
      <Link to={"/login"} className="link-secondary">
        <p className="text-center">Powrót do ekranu logowania</p>
      </Link>
    </>
  );
};
