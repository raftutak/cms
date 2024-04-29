import { Category } from "../models/Category.js";
import { Image } from "../models/Image.js";
import { Post } from "../models/Post.js";
import { PostCategory } from "../models/PostCategory.js";
import { User } from "../models/User.js";

export const getPosts = async (req, res) => {
  const { categoryId } = req.params;

  try {
    let filteredPostIds = [];
    if (categoryId) {
      const filteredPosts = await Post.findAll({
        include: [
          {
            model: Category,
            as: "categories",
            where: { id: categoryId },
            through: { attributes: [] },
            attributes: [],
          },
        ],
      });
      filteredPostIds = filteredPosts.map((post) => post.id);
    }

    const posts = await Post.findAll({
      where: categoryId ? { id: filteredPostIds } : {},
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

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: "getPostsFailed",
      message: "Get posts failed",
    });
  }
};

export const getPost = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    const condition = /^\d+$/.test(idOrSlug)
      ? { id: idOrSlug }
      : { slug: idOrSlug };

    const post = await Post.findOne({
      where: condition,
      include: [
        { model: User, as: "author", attributes: ["name"] },
        { model: Image, as: "image", attributes: ["id", "filepath"] },
        { model: Category, as: "categories", attributes: ["id", "name"] },
      ],
      attributes: [
        "id",
        "title",
        "author_id",
        "imageId",
        "content",
        "created_at",
        "updated_at",
      ],
    });

    if (!post) {
      res
        .status(404)
        .json({ code: "getPostFailed", message: "Post not found" });
      return;
    }

    res
      .status(200)
      .json({ post, code: "getPostCompleted", message: "getPostCompleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: "getPostFailed",
      message: "Get post failed",
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, authorId, slug, categories } = req.body;
    const image = req.file;

    console.log("received categories", categories);

    const newPost = await Post.create({
      title,
      author_id: authorId,
      content,
      slug,
    });

    const updatedSlug = `${slug}-${newPost.id}`;

    await newPost.update({ slug: updatedSlug });

    if (categories) {
      const categoryIds = categories.split(",").map(Number);
      console.log("setting categories", categoryIds);
      await newPost.setCategories(categoryIds);
    }

    if (image) {
      const newImage = await Image.create({
        filename: image.filename,
        filepath: "uploads/" + image.filename,
        postId: newPost.id,
      });

      console.log(newImage);
      console.log(newImage.id);

      await newPost.update({ imageId: newImage.id });
    }

    res
      .status(201)
      .json({ code: "createPostCompleted", message: "Create post completed" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: "createPostFailed", message: "Create post failed" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, title, imageToDelete, categories } = req.body;
    const image = req.file;

    if (imageToDelete) await Image.destroy({ where: { id: imageToDelete } });

    if (image) {
      const newImage = await Image.create({
        filename: image.filename,
        filepath: "uploads/" + image.filename,
        postId: id,
      });

      await Post.update(
        { title, content, imageId: newImage.id },
        { where: { id } }
      );
    } else {
      await Post.update({ title, content }, { where: { id } });
    }

    const post = await Post.findByPk(id);

    if (categories) {
      const categoryIds = categories.split(",").map(Number);
      await post.setCategories(categoryIds);
    } else {
      await post.setCategories([]);
    }

    res
      .status(200)
      .json({ code: "updatePostCompleted", message: "Update post completed" });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await PostCategory.destroy({ where: { postId: id } });
    await Image.destroy({ where: { postId: id } });

    await Post.destroy({ where: { id } });

    res.status(200).json({
      code: "deletePostCompleted",
      message: "Delete post completed",
      id,
    });
  } catch (error) {
    res.status(500).json({
      code: "deletePostFailed",
      message: "Delete post failed",
    });
  }
};
