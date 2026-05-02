require("dotenv").config();
const { DataSource } = require("typeorm");
const User = require("../entities/User");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
port: 5432,
username: "postgres",
password: "root",
database: "asgn2",
  synchronize: true,
  entities: [User]
});

module.exports = { AppDataSource };