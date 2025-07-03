import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        checkEmail(value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) throw new Error("invalid email ");
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        checkPasswordLength(value) {
          if (value.length <= 6)
            throw new Error("Password length should be greater than 6");
        },
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin"],
    },
  },
  {
    // Other model options go here
    timestamps: true,
  }
);

User.beforeCreate(async (user, options) => {
  const nameLength = user.name.length;
  if (nameLength <= 2) {
    throw new Error("user name must be more than 2 chracter");
  }
});
