export const allAccess = (req, res) => {
  res.status(200).send("Public content");
};

export const adminAccess = (req, res) => {
  res.status(200).send("Admin content");
};

export const moderatorAccess = (req, res) => {
  res.status(200).send("Moderator content");
};
