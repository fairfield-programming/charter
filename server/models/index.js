import Sequelize from "sequelize";

import users from "./users.js";
import charters from "./charters.js";
import announcements from "./announcements.js";

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  dialect: "postgres",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

const User = users(sequelize, Sequelize.DataTypes);
const Charter = charters(sequelize, Sequelize.DataTypes);
const Announcement = announcements(sequelize, Sequelize.DataTypes);

// Charter - User
User.belongsTo(Charter);
Charter.hasMany(User);

// User - Announcement
User.hasMany(Announcement);
Announcement.belongsTo(User);

// Charter - Announcement
Charter.hasMany(Announcement);
Announcement.belongsTo(Charter);

export { User, Charter, Announcement };

export const initDB = async () => {
  await sequelize.sync({ alter: true });
};