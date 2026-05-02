const userRepo = require("../repositories/userRepository");

module.exports = async (data) => {
  const { name, email } = data;

  if (!name) throw new Error("Name is required");
  if (!email) throw new Error("Email is required");

  const existingUser = await userRepo.findByEmail(email);

  if (existingUser) throw new Error("Email already exists");

  return await userRepo.create({ name, email });
};