import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Post } from "./Post.js";
import { Page } from "./Page.js";

export const Image = sequelize.define("Image", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filepath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Posts",
      key: "id",
    },
  },
  pageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Pages",
      key: "id",
    },
  },
});
