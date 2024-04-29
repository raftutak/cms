import { Category } from "../models/Category.js";
import { PostCategory } from "../models/PostCategory.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.status(200).json({
      code: "getCategoriesCompleted",
      message: "Get categories completed",
      categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: "getCategoriesFailed", message: "Get categories failed" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);

    res.status(200).json({
      code: "getCategoryCompleted",
      message: "Get category completed",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: "getCategoryFailed", message: "Get category failed" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json({
      code: "createCategoryCompleted",
      message: "Create category completed",
      id: category.id,
    });
  } catch (error) {
    res.status(500).json({
      code: "createCategoryFailed",
      message: "Create category failed",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.update(
      { name, description },
      { where: { id } }
    );

    res.status(200).json({
      code: "updateCategoryCompleted",
      message: "Update category completed",
      id: category.id,
    });
  } catch (error) {
    res.status(500).json({
      code: "updateCategoryFailed",
      message: "Update category failed",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    await PostCategory.destroy({ where: { categoryId: id } });

    await Category.destroy({ where: { id } });

    res.status(200).json({
      code: "deleteCategoryCompleted",
      message: "Delete category completed",
      id,
    });
  } catch (error) {
    res.status(500).json({
      code: "deleteCategoryFailed",
      message: "Delete category failed",
    });
  }
};
