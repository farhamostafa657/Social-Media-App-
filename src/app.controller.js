import userRouter from "./Modules/Users/users.controller.js";
import authRouter from "./Modules/Auth/auth.controller.js";
import commentsRouter from "./Modules/Comments/comments.controller.js";
import postsRouter from "./Modules/Posts/posts.controller.js";
import { connectDB, syncTables } from "./DB/connection.js";
import { User } from "./DB/Models/user.model.js";

const bootstrap = async (app, express) => {
  app.use(express.json()); //parsing body

  await connectDB();
  await syncTables();
  // User.create({
  //   name: "f",
  //   email: "fatmaa.abdo960@yahoo.com",
  //   password: "1234567",
  //   rolw: "admin",
  // });
  //subrouting
  app.use("/users/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/posts", postsRouter);
  app.use("/comments", commentsRouter);

  app.use("/*dummy", (req, res) => {
    return res.status(404).json({ message: "Not Found Handler" });
  });
};

export default bootstrap;
