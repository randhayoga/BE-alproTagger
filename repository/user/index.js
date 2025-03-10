const bcrypt = require("bcrypt");
const { Users: users } = require("../../models");
const { Op } = require("sequelize");

exports.getUserByID = async (id) => {
  // For loggin in by Postman
  if (data.length > 0) {
    return data[0];
  } else {
    throw new Error(`User is not found!`);
  }
};

exports.getUserByEmail = async (email) => {
  // For loggin in by the web as a regular user
  data = await users.findAll({
    where: {
      email,
      role: "user",
    },
  });

  if (data.length > 0) {
    return data[0];
  } else {
    throw new Error(`User is not found!`);
  }
};

exports.getAdminByEmail = async (email) => {
  // For logging in as admin
  data = await users.findAll({
    where: {
      email,
      role: {
        [Op.eq]: "admin",
      },
    },
  });

  if (data.length > 0) {
    return data[0];
  } else {
    throw new Error(`Admin is not found!`);
  }
};

exports.setUser = async (payload) => {
  payload.password = bcrypt.hashSync(payload.password, 10);
  const data = await users.create(payload);
  return data;
};

exports.setAdmin = async (payload) => {
  // Promoting user to admin
  payload.password = bcrypt.hashSync(payload.password, 10);
  payload.role = "admin";
  const data = await users.create(payload);
  return data;
};
