import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    slug: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);
