import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { UserToken } from "../models/UserToken.js";
import { User } from "../models/User.js";

export const sendResetPassword = async (req, res) => {
  const { email } = req.body;
  const expirationTime = 24;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(200).json({ message: "Nie ma takiego usera" });
    }

    const resetPasswordToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: `${expirationTime}h`,
    });

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expirationTime);

    const previousResetPassword = await UserToken.findOne({
      where: { email, type: "RESET_PASSWORD" },
    });

    if (previousResetPassword)
      await UserToken.destroy({ where: { id: previousResetPassword.id } });

    await UserToken.create({
      email,
      token: resetPasswordToken,
      type: "RESET_PASSWORD",
      expiresAt,
      role: "RESET_PASSWORD",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "CMS - resetowanie hasła",
      html: `<p>Kliknij <a target="_blank" href="https://localhost:5173/reset-password?token=${resetPasswordToken}">tutaj</a> aby przejść do formularza resetowania hasła. Link jest ważny przez 24 godziny od otrzymania tej wiadomości.</p>`,
    };

    await transporter.sendMail(emailOptions);

    res.status(201).json({ message: "User jest i dostał email", emailOptions });
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
};

export const verifyResetPasswordToken = async (req, res) => {
  const { resetPasswordToken } = req.body;

  try {
    const decoded = jwt.verify(resetPasswordToken, process.env.JWT_SECRET);

    const resetPasswordRequest = await UserToken.findOne({
      where: {
        token: resetPasswordToken,
        type: "RESET_PASSWORD",
        email: decoded.email,
      },
    });

    if (
      !resetPasswordRequest ||
      new Date() > new Date(resetPasswordRequest.expiresAt)
    ) {
      return res
        .status(400)
        .json({ message: "Niepoprawny lub nieważny token resetowania hasła" });
    }

    res.status(200).json({
      message: "Token poprawny i aktualny",
      email: resetPasswordRequest.email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Błąd podczas weryfikacji tokenu resetowania hasła." });
  }
};

export const setPassword = async (req, res) => {
  const { email, password, resetPasswordToken } = req.body;
  console.log(email, password, resetPasswordToken);

  try {
    const resetPasswordRequest = await UserToken.findOne({
      where: { token: resetPasswordToken, type: "RESET_PASSWORD" },
    });

    if (resetPasswordRequest?.email !== email) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset password token" });
    }

    if (new Date() > new Date(resetPasswordRequest.expiresAt)) {
      return res.status(400).send("Reset password token expired");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({ where: { email } });
    user.password = hashedPassword;

    console.log("tutaj");

    await user.save();

    await UserToken.destroy({ where: { id: resetPasswordRequest.id } });

    res
      .status(201)
      .json({ code: "resetPasswordCompleted", message: "Hasło zresetowane" });
  } catch (error) {
    res.status(500).json({
      error: "serverError",
      message: "Błąd podczas resetowania hasła",
    });
  }
};
