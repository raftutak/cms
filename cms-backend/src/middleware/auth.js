import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json({
      code: "verifyTokenFailed",
      message: "No authentication token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        code: "verifyTokenFailed",
        message: "Unauthorized action",
      });
    }

    req.userId = decoded.id;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        code: "verifyTokenFailed",
        message: "Token expired",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        code: "verifyTokenFailed",
        message: "Invalid token",
      });
    } else {
      return res.status(500).json({
        code: "verifyTokenFailed",
        message: "Could not verify token",
      });
    }
  }
};

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId);

  if (user.role !== "ADMINISTRATOR") {
    return res.status(403).json({
      code: "permissionCheckFailed",
      message: "No administrator access",
    });
  }

  next();
};

const isModerator = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  console.log(`isModerator? - ${user.role}`);

  if (user.role === "ADMINISTRATOR" || user.role === "MODERATOR") {
    console.log("mod test passed");
    next();
  } else {
    return res.status(403).json({
      code: "permissionCheckFailed",
      message: "No moderator/administrator access",
    });
  }
};

const verifyEmailExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({
        code: "emailVerificationFailed",
        message: "This email already exists",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      code: "emailVerificationFailed",
      message: "Email exists verification error",
    });
  }
};

export const Auth = {
  verifyToken,
  isAdmin,
  isModerator,
  verifyEmailExists,
};
