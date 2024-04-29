import { Auth } from "../middleware/auth.js";
import {
  allAccess,
  adminAccess,
  moderatorAccess,
} from "../controllers/test.controller.js";

export const testRoutes = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", allAccess);

  app.get("/api/test/admin", [Auth.verifyToken, Auth.isAdmin], adminAccess);

  app.get(
    "/api/test/moderator",
    [Auth.verifyToken, Auth.isModerator],
    moderatorAccess
  );
};
