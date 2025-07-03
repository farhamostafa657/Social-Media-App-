import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";
import { User } from "./user.model.js";

class Posts extends Model {}

export const PostsModel = Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
  }
);

User.hasMany(Posts);
Posts.belongsTo(User);
