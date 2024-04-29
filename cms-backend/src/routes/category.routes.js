import {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { Auth } from "../middleware/auth.js";

export const categoriesRoutes = (app) => {
  app.get("/api/categories", getCategories);

  app.post(
    "/api/categories",
    [Auth.verifyToken, Auth.isModerator],
    createCategory
  );

  app.get("/api/categories/:id", getCategory);

  app.patch(
    "/api/categories/:id",
    [Auth.verifyToken, Auth.isModerator],
    updateCategory
  );

  app.delete(
    "/api/categories/:id",
    [Auth.verifyToken, Auth.isModerator],
    deleteCategory
  );
};
