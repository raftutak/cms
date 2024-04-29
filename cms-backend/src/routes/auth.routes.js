import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { Auth } from "../middleware/auth.js";

export const authRoutes = (app) => {
  app.post("/api/auth/register", [Auth.verifyEmailExists], registerUser);
  app.post("/api/auth/login", loginUser);
};
