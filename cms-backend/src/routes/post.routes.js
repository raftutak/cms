import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";
import { Auth } from "../middleware/auth.js";
import { Multer } from "../middleware/multer.js";

export const postRoutes = (app) => {
  app.get("/api/posts", getPosts);

  app.post(
    "/api/posts",
    [Auth.verifyToken, Auth.isModerator, Multer.upload.single("image")],
    createPost
  );

  app.get("/api/posts/:idOrSlug", getPost);

  app.get("/api/posts/category/:categoryId", getPosts);

  app.patch(
    "/api/posts/:id",
    [Auth.verifyToken, Auth.isModerator, Multer.upload.single("image")],
    updatePost
  );

  app.delete(
    "/api/posts/:id",
    [Auth.verifyToken, Auth.isModerator],
    deletePost
  );
};
