import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Page = sequelize.define(
  "Page",
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    page_type: DataTypes.STRING,
  },
  { timestamps: false }
);
