import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const PostCategory = sequelize.define("PostCategory", {
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Posts",
      key: "id",
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Categories",
      key: "id",
    },
  },
});
