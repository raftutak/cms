import { getSite, updateSite } from "../controllers/site.controller.js";
import { Auth } from "../middleware/auth.js";

export const siteRoutes = (app) => {
  // returns site configuration
  app.get("/api/site", getSite);

  // updates site configuration
  app.patch("/api/site", [Auth.verifyToken, Auth.isAdmin], updateSite);
};
