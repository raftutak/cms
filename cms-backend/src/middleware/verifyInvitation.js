import jwt from "jsonwebtoken";

import { User } from "../models/User.js";
import { UserInvitation } from "../models/UserInvitation.js";

export const verifyInvitation = async (req, res, next) => {
  const { invitationToken } = req.body;
  try {
    // const decoded = jwt.verify(invitationToken, process.env.JWT_SECRET);

    // const invitation = await UserInvitation.findOne({
    //   where: { invitationToken, email: decoded.email },
    // });

    // const user = await User.findOne({ where: { email } });

    // if (user) {
    //   return res
    //     .status(400)
    //     .send({ message: "Użytkownik z takim adresem email już istnieje." });
    // }

    // if (!invitation || new Date() > new Date(invitation.expiresAt)) {
    //   return res.status(400).send({
    //     message: "Link do rejestracji jest nieprawidłowy lub wygasł.",
    //   });
    // }

    res
      .status(200)
      .json({ message: "Token poprawny i aktualny", email: invitation.email });

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Błąd podczas weryfikacji tokenu rejestracji." });
  }
};

const verifyInvitation = async (req, res, next) => {
  const { invitationToken } = req.invitationToken;

  const decoded = jwt.verify(invitationToken, process.env.JWT_SECRET);

  const invitation = await UserInvitation.findOne({
    where: { invitationToken, email: decoded.email },
  });

  if (!invitation || new Date() > new Date(invitation.expiresAt)) {
    return res
      .status(400)
      .json({
        code: "verifyInvitationFailed",
        message: "Invitation link expired",
      });
  }

  req.email = decoded.email;

  next();
};
