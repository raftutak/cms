import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const SiteConfig = sequelize.define(
  "SiteConfig",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    menu: { type: DataTypes.STRING, allowNull: false },
    footer: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);
