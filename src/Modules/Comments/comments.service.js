import { json, Op } from "sequelize";
import { CommentsModel } from "../../DB/Models/comments.model.js";
import { User } from "../../DB/Models/user.model.js";
import { PostsModel } from "../../DB/Models/posts.model.js";

export const createBulkComments = async (req, res, next) => {
  try {
    //const { content, UserId, PostId } = req.body;
    //console.log(req.body.comments, "$$$$$$$$$$$$$$$$$$$$$$$");
    const comments = await CommentsModel.bulkCreate(req.body.comments, {
      validate: true,
    });
    return res
      .status(200)
      .json({ message: "comments created successully", comments });
  } catch (error) {
    if (error.name) {
      return res
        .status(500)
        .json({ message: error.errors.map((error) => error.message) });
    }
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { UserId, content } = req.body;

    const user = await User.findByPk(UserId);
    if (!user) return res.status(404).json({ message: "user not found" });

    const comment = await CommentsModel.findByPk(commentId);
    if (!comment) return res.status(404).json({ message: "comment not found" });
    if (comment.UserId != UserId) {
      return res
        .status(404)
        .json({ message: "you are not authorized to update this comments" });
    }

    const updateComment = await CommentsModel.update(
      { UserId, content },
      {
        where: { id: commentId },
      }
    );
    return res.status(200).json({ message: "comment updated", updateComment });
  } catch (error) {
    if (error.name) {
      return res
        .status(500)
        .json({ message: error.errors.map((error) => error.message) });
    }
  }
};

export const findOrCreate = async (req, res, next) => {
  try {
    const { PostId, UserId, content } = req.body;
    const [myComment, isCreated] = await CommentsModel.findOrCreate({
      where: {
        PostId,
        UserId,
        content,
      },
    });
    return res.status(200).json({ comment: myComment, created: isCreated });
  } catch (error) {
    // if (error.name) {
    //   return res
    //     .status(500)
    //     .json({ message: error.errors.map((error) => error.message) });
    // }
    return res.status(500).json({ message: error.message });
  }
};

export const searchComments = async (req, res, next) => {
  try {
    const { word } = req.query;

    if (!word) {
      return res.status(200).json({ message: "you should cotain the word" });
    }

    const { count, rows: comments } = await CommentsModel.findAndCountAll({
      where: {
        content: { [Op.like]: `${word}%` },
      },
    });

    console.log("****************************", comments);
    if (count == 0)
      return res.status(404).json({ message: "no comments found" });

    return res.status(200).json({ count, comments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const newest = async (req, res, next) => {
  try {
    const { PostId } = req.params;

    const posts = await CommentsModel.findAll({
      where: { PostId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    if (posts.length == 0) {
      return res.status(404).json({ message: "no posts found" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ mesaage: error.message });
  }
};

export const commentDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await CommentsModel.findOne({
      where: { id },
      attributes: ["id", "content"],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: PostsModel,
          attributes: ["id", "title", "content"],
        },
      ],
    });
    if (!comment) return res.status(404).json({ message: "comment not found" });
    return res.status(200).json({ comment });
  } catch (error) {
    return res.status(500).json({ mesaage: error.message });
  }
};
