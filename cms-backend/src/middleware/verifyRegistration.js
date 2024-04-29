import { User } from "../models/User";

export const verifyRegistrationEmail = async (req, res, next) => {
  const { email } = req.body.email;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res
        .status(400)
        .send({ message: "Użytkownik z takim adresem email już istnieje." });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Błąd podczas weryfikacji emaila do rejestracji." });
  }
};
