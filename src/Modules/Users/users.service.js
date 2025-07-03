import { User } from "../../DB/Models/user.model.js";

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, age, role } = req.body;

    // const updatedUser = await User.update(
    //   { name, email, role },
    //   { where: { id } }
    // );

    const updatedUser = await User.upsert(
      { id, name, email, role },
      { validate: false }
    );

    res
      .status(200)
      .json({ message: "User Updated or Created  successfully", updatedUser });
  } catch (error) {
    if (error.name) {
      return res
        .status(500)
        .json({ message: error.errors.map((error) => error.message) });
    }
    return res.status(500).json({ message: error });
  }
};

export const findUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    console.log("hay***********", email);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    if (error.name) {
      return res
        .status(500)
        .json({ message: error.errors.map((error) => error.message) });
    }
  }
};

export const findUserByPK = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json("no user found");
    }
    const { role, ...rest } = user.dataValues;
    return res.status(200).json(rest);
  } catch (error) {
    if (error.name) {
      return res
        .status(500)
        .json({ message: error.errors.map((error) => error.message) });
    }
  }
};
