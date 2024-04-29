import { Page } from "../models/Page.js";
import { SiteConfig } from "../models/SiteConfig.js";

export const getSite = async (req, res) => {
  try {
    const site = await SiteConfig.findByPk(1);
    const pages = await Page.findAll({ attributes: { exclude: ["content"] } });

    res.status(200).json({
      code: "getSiteCompleted",
      message: "Get site completed",
      site,
      pages,
    });
  } catch (error) {
    res.status(500).json({ code: "getSiteFailed", message: "Get site failed" });
  }
};

export const updateSite = async (req, res) => {
  try {
    const { title, menu, footer } = req.body;

    await SiteConfig.update(
      { title, menu: JSON.stringify(menu), footer },
      { where: { id: 1 } }
    );

    res.status(200).json({
      code: "updateSiteCompleted",
      message: "Update site completed",
    });
  } catch (error) {
    res.status(500).json({
      code: "updateSiteFailed",
      message: "Update site failed",
    });
  }
};
