import {
  sendResetPassword,
  setPassword,
  verifyResetPasswordToken,
} from "../controllers/password.controller.js";

export const passwordRoutes = (app) => {
  app.post("/api/resetPassword/send", sendResetPassword);

  app.post("/api/resetPassword/verifyToken", verifyResetPasswordToken);

  app.post("/api/resetPassword/setPassword", setPassword);
};
