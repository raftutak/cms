import { Op } from "sequelize";
import { Page } from "../models/Page.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import { Category } from "../models/Category.js";
import { Image } from "../models/Image.js";

export const search = async (req, res) => {
  const { query } = req.params;

  try {
    const pages = await Page.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    const posts = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } },
        ],
      },
      include: [
        { model: User, as: "author", attributes: ["id", "name"] },
        { model: Image, as: "image", attributes: ["id", "filepath"] },
        { model: Category, as: "categories", attributes: ["id", "name"] },
      ],
      attributes: [
        "id",
        "title",
        "author_id",
        "imageId",
        "slug",
        "content",
        "created_at",
        "updated_at",
      ],
    });

    res.status(200).json({ code: "searchCompleted", pages, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: "searchFailed",
      message: "Search failed",
    });
  }
};
