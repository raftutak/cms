import {
  getPageById,
  getPagesConfig,
  createPage,
  updatePage,
  deletePage,
} from "../controllers/page.controller.js";
import { Auth } from "../middleware/auth.js";

export const pageRoutes = (app) => {
  app.get("/api/pages", getPagesConfig);

  app.post("/api/pages", [Auth.verifyToken, Auth.isModerator], createPage);

  app.get("/api/pages/:id", getPageById);

  app.patch("/api/pages/:id", [Auth.verifyToken, Auth.isModerator], updatePage);

  app.delete(
    "/api/pages/:id",
    [Auth.verifyToken, Auth.isModerator],
    deletePage
  );
};
