import {
  deleteUser,
  getUserById,
  getUsers,
  toggleUserActive,
  updateUser,
  updateProfile,
  getProfile,
} from "../controllers/user.controller.js";
import { Auth } from "../middleware/auth.js";

export const userRoutes = (app) => {
  app.get("/api/users", [Auth.verifyToken, Auth.isAdmin], getUsers);

  app.get("/api/users/:id", [Auth.verifyToken, Auth.isAdmin], getUserById);

  app.patch("/api/users/:id", [Auth.verifyToken, Auth.isAdmin], updateUser);

  app.get("/api/users/:id/getProfile", [Auth.verifyToken], getProfile);

  app.patch("/api/users/:id/updateProfile", [Auth.verifyToken], updateProfile);

  app.patch(
    "/api/users/:id/active",
    [Auth.verifyToken, Auth.isAdmin],
    toggleUserActive
  );

  app.delete("/api/users/:id", [Auth.verifyToken, Auth.isAdmin], deleteUser);
};
