import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const UserInvitation = sequelize.define("UserInvitation", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invitationToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
