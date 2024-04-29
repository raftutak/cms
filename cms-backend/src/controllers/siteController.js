export const getSiteConfig = async (req, res) => {
  try {
    res.status(200).send({ title: "Projekt CMS", topBar: { color: "red" } });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
