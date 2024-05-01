const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("AppointMe", "Noah\noahm", "!234Noah", {
  host: "localhost",
  dialect: "mysql",
});

export default async function sequelizeConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
