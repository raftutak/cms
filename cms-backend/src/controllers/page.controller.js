import { Page } from "../models/Page.js";
import { SiteConfig } from "../models/SiteConfig.js";

export const getPagesConfig = async (req, res) => {
  try {
    const pages = await Page.findAll();

    res.status(200).json({ pages });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Błąd podczas weryfikacji tokenu resetowania hasła." });
  }
};

export const getPageById = async (req, res) => {
  try {
    const id = req.params.id;

    console.log(req.params);

    const page = await Page.findByPk(id);

    console.log(page);

    res.status(200).json({ page });
  } catch (error) {
    console.log(error);
  }
};

export const createPage = async (req, res) => {
  try {
    const { elements, title, type } = req.body;

    const newPage = await Page.create({
      title,
      page_type: type,
      content: JSON.stringify(elements),
    });

    console.log(newPage.id);

    res
      .status(201)
      .json({ code: "createPageCompleted", message: "Create page completed" });
  } catch (error) {
    console.log(error);
  }
};

export const updatePage = async (req, res) => {
  try {
    const id = req.params.id;
    const { elements, title } = req.body;

    console.log(req.params);

    const page = await Page.update(
      { title, content: JSON.stringify(elements) },
      { where: { id } }
    );

    const siteConfig = await SiteConfig.findByPk(1);
    const menu = JSON.parse(siteConfig.menu);

    menu.forEach((menu) => {
      menu.links.forEach((link) => {
        if (Number(link.id) === Number(id)) {
          link.name = title;
        }
      });
    });

    const updatedJson = JSON.stringify(menu);

    await SiteConfig.update({ menu: updatedJson }, { where: { id: 1 } });

    res
      .status(200)
      .json({ code: "updatePageCompleted", message: "Update page completed" });
  } catch (error) {
    console.log(error);
  }
};

export const deletePage = async (req, res) => {
  try {
    const { id } = req.params;

    const siteConfig = await SiteConfig.findOne({ where: { id: 1 } });
    let menus = siteConfig.menu ? JSON.parse(siteConfig.menu) : [];

    menus = menus.map((menu) => ({
      ...menu,
      links: menu.links.filter((link) => link.id !== Number(id)),
    }));

    await SiteConfig.update(
      { menu: JSON.stringify(menus) },
      { where: { id: 1 } }
    );

    await Page.destroy({ where: { id } });

    res.status(200).json({
      code: "deletePageCompleted",
      message: "Delete page completed",
      id,
    });
  } catch (error) {
    res.status(500).json({
      code: "deletePageFailed",
      message: "Delete page failed",
    });
  }
};
