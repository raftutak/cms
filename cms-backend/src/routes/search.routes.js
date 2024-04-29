import { search } from "../controllers/search.controller.js";

export const searchRoutes = (app) => {
  app.get("/api/search/:query", search);
};
