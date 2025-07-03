import { where } from "sequelize";
import { User } from "../../DB/Models/user.model.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const userEmail = await User.findOne({ where: { email: email } });
    if (userEmail) {
      return res.status(404).json({ message: "Email already exists" });
    }
    const user = await User.build({ name, email, password, role });
    await user.save();
    return res.status(201).json({ message: "user created succeffully", user });
  } catch (error) {
    if (error.name) {
      return res
        .status(500)
        .json({ message: error.errors.map((error) => error.message) });
    }

    return res.status(500).json({ message: error });
  }
};
