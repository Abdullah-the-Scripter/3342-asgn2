const { AppDataSource } = require("../config/data-source");

const repo = () => AppDataSource.getRepository("User");

exports.create = (data) => repo().save(data);

exports.findByEmail = (email) => {
  return repo().findOne({ where: { email } });
};

exports.clearAll = () => repo().clear();

exports.findAll = () => repo().find();