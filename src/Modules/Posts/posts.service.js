import { PostsModel } from "../../DB/Models/posts.model.js";
import { User } from "../../DB/Models/user.model.js";
import { CommentsModel } from "../../DB/Models/comments.model.js";
import { sequelize } from "../../DB/connection.js";

export const createNewPost = async (req, res, next) => {
  try {
    const { title, content, UserId } = req.body;
    //check if user exist
    const user = await User.findByPk(UserId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const post = await PostsModel.build({ title, content, UserId });
    await post.save();
    return res.status(200).json({ message: "post created successfully", post });
  } catch (error) {
    if (error.name) {
      return res
        .status(500)
        .json({ message: error.errors.map((error) => error.message) });
    }
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const { UserId } = req.body;
    const user = await User.findByPk(UserId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const post = await PostsModel.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    if (post.UserId !== UserId) {
      return res
        .status(404)
        .json({ message: "you are not authorized to update this block" });
    }

    const deletePost = await PostsModel.destroy({ where: { id: postId } });
    return res
      .status(201)
      .json({ message: "post deleted successfully", deletePost });
  } catch (error) {
    // if (error.name) {
    //   return res
    //     .status(500)
    //     .json({ message: error.errors.map((error) => error.message) });
    // }
    return res.status(500).json({ message: error.message });
  }
};

export const postsDtails = async (req, res, next) => {
  try {
    const postDetails = await PostsModel.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: CommentsModel,
          attributes: ["id", "content"],
        },
      ],
    });

    return res
      .status(200)
      .json({ message: "posts fetched successfully", postDetails });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const commentCount = async (req, res, next) => {
  try {
    const posts = await PostsModel.findAll({
      attributes: [
        "id",
        "title",
        [sequelize.fn("COUNT", sequelize.col("comments.id")), "commentCount"],
      ],
      include: [
        {
          model: CommentsModel,
          attributes: [],
        },
      ],
      group: ["posts.id"],
    });

    return res
      .status(200)
      .json({ message: "posts fetched successfully", posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
