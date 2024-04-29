import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { UserToken } from "../models/UserToken.js";

export const sendInvitation = async (req, res) => {
  const { email, role } = req.body;
  const expirationTime = 24;

  try {
    const invitationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: `${expirationTime}h`,
    });

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expirationTime);

    const previousInvitation = await UserToken.findOne({
      where: { email, type: "INVITATION" },
    });

    if (previousInvitation)
      await UserToken.destroy({ where: { id: previousInvitation.id } });

    await UserToken.create({
      email,
      token: invitationToken,
      type: "INVITATION",
      role,
      expiresAt,
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
      subject: "CMS - zaproszenie do rejestracji",
      html: `<p>Kliknij <a target="_blank" href="https://localhost:5173/register?token=${invitationToken}">tutaj</a> aby się zarejestrować. Zaproszenie jest ważne przez 24 godziny od otrzymania tej wiadomości.</p>`,
    };

    await transporter.sendMail(emailOptions);

    res
      .status(200)
      .json({ code: "inviteCompleted", message: "Invitation sent" });
  } catch (error) {
    console.error(error);

    const customError = {
      errorCode: error.original.code,
      errorNumber: error.original.errno,
      errorMessage: error.original.sqlMessage,
    };

    res.status(500).send(customError);
  }
};

export const verifyInvitationToken = async (req, res) => {
  const { invitationToken } = req.body;

  try {
    const decoded = jwt.verify(invitationToken, process.env.JWT_SECRET);

    const invitation = await UserToken.findOne({
      where: {
        token: invitationToken,
        type: "INVITATION",
        email: decoded.email,
      },
    });

    if (!invitation || new Date() > new Date(invitation.expiresAt)) {
      return res.status(400).json({
        error: "verifyInvitationTokenFailed",
        message: "Token invalid or expired",
      });
    }

    res.status(200).json({
      code: "verifyInvitationTokenCompleted",
      message: "Token poprawny i aktualny",
      email: invitation.email,
      role: invitation.role,
    });
  } catch (error) {
    res.status(500).json({
      error: "verifyInvitationTokenFailed",
      message: "Verify invitation token failed",
    });
  }
};
