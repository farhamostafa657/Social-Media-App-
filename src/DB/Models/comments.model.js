import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import { PostsModel } from "./posts.model.js";
import { User } from "./user.model.js";

class Comments extends Model {}

export const CommentsModel = Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
  },
  { sequelize, timestamps: true }
);

PostsModel.hasMany(CommentsModel);
CommentsModel.belongsTo(PostsModel);

User.hasMany(CommentsModel);
CommentsModel.belongsTo(User);
