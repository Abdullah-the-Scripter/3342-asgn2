const { AppDataSource } = require("./config/data-source");
const app = require("./app");

AppDataSource.initialize().then(() => {
  app.listen(3000);
});