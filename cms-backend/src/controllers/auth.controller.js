import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
import { UserToken } from "../models/UserToken.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        code: "loginUserFailed",
        message: "Incorrect email or password",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        code: "loginUserFailed",
        message: "Incorrect email or password",
      });
    }

    if (!user.active) {
      return res
        .status(401)
        .json({ code: "accountDisabled", message: "Account is disabled" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      userId: user.id,
      name: user.name,
      role: user.role,
      token,
      code: "loginUserCompleted",
      message: "Login succeeded",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: "loginUserFailed", message: "Server error" });
  }
};

export const registerUser = async (req, res) => {
  const { email, name, password, invitationToken, role } = req.body;

  try {
    const invitation = await UserToken.findOne({
      where: { token: invitationToken, type: "INVITATION" },
    });

    if (invitation?.email !== email) {
      return res.status(400).json({
        code: "registerUserFailed",
        message: "Invalid or expired invitation",
      });
    }

    if (new Date() > new Date(invitation.expiresAt)) {
      return res.status(400).json({
        code: "registerUserFailed",
        message: "Invitation token expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      active: true,
    });

    await UserToken.destroy({ where: { id: invitation.id } });

    res
      .status(201)
      .json({ code: "userRegistered", message: "User registration completed" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "serverError", message: "User registration error" });
  }
};
