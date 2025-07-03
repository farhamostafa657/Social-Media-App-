import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("sequelize", "root", "root", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connection has been establish successfully");
  } catch (error) {
    console.error("Unable to connect to the database", error);
  }
};

export const syncTables = async () => {
  try {
    await sequelize.sync();
    console.log("Tables has been senchronized successfully");
  } catch (error) {
    console.error("unable to synchronized tables", error.message);
  }
};
