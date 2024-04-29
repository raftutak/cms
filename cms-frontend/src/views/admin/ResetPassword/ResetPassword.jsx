import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { ResetPasswordSuccess } from "./ResetPasswordSuccess";
import { ResetPasswordError } from "./ResetPasswordError";

export const ResetPassword = () => {
  const resetPasswordLoaderData = useLoaderData();
  const email = resetPasswordLoaderData?.email;
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isResetCompleted, setIsResetCompleted] = useState(false);

  let view;

  if (isResetCompleted) view = <ResetPasswordSuccess />;

  if (!email) view = <ResetPasswordError />;

  return (
    <ResetPasswordForm
      resetPasswordLoaderData={resetPasswordLoaderData}
      resetPasswordError={resetPasswordError}
      setResetPasswordError={setResetPasswordError}
      setIsResetCompleted={setIsResetCompleted}
      showAlert={showAlert}
      setShowAlert={setShowAlert}
    />
  );
};
