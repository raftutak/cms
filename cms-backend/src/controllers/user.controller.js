import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });

    console.log(users);

    res.status(200).json({ code: "getUsersCompleted", users });
  } catch (error) {
    res.status(500).json({
      code: "getUsersFailed",
      message: "Error when trying to get all users",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    console.log(req.params);

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    console.log(user);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.params;
  const requestorId = req.userId;

  console.log(id, requestorId);

  if (Number(requestorId) !== Number(id)) {
    return res.status(400).json({
      code: "getProfileFailed",
      message: "Account ID is different than requestor ID",
    });
  }

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    console.log(user);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  console.log(req.userId, "tokenUserId");
  console.log(req.params.id, "activechangeUserId");
  const { id } = req.params;
  const requestorId = req.userId;
  const { name, password } = req.body;

  try {
    if (Number(id) === Number(requestorId)) {
      const updateData = { name };

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }

      await User.update(updateData, { where: { id } });

      return res.status(200).json({
        code: "profileUpdateCompleted",
        message: "Profile update completed",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: "profileUpdateFailed", message: "Profile update failed" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    await User.update({ name, role }, { where: { id } });

    res.status(200).json({
      code: "userUpdateCompleted",
      message: "User update completed",
      id,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: "userUpdateFailed", message: "User update failed" });
  }
};

export const toggleUserActive = async (req, res) => {
  console.log(req.userId, "tokenUserId");
  console.log(req.params.id, "activechangeUserId");

  try {
    const { id } = req.params;
    const requestorId = req.userId;
    const { active } = req.body;

    if (Number(id) === Number(requestorId)) {
      return res.status(400).json({
        code: "activeUpdateFailed",
        message: "Account ID is equal to requestor ID",
      });
    }

    await User.update({ active }, { where: { id } });

    res.status(200).json({
      code: "activeUpdateCompleted",
      message: "Active update completed",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: "activeUpdateFailed", message: "Active update failed" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({ where: { id } });

    res.status(200).json({
      code: "userDeleteCompleted",
      message: "User deleted",
      deletedId: id,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: "userDeleteFailed", message: "Usere delete failed" });
  }
};
