import { Category } from "../models/Category.js";
import { Image } from "../models/Image.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

export const associateModels = () => {
  User.hasMany(Post, { foreignKey: "author_id", as: "post" });

  Post.hasOne(Image, { foreignKey: "postId", as: "image" });
  Post.belongsTo(User, { foreignKey: "author_id", as: "author" });

  Image.belongsTo(Post, { foreignKey: "postId", as: "post" });

  Post.belongsToMany(Category, { through: "PostCategories", as: "categories" });
  Category.belongsToMany(Post, { through: "PostCategories", as: "categories" });
};
