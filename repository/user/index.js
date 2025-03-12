const bcrypt = require("bcrypt");
const { user } = require("../../models");
const { Op } = require("sequelize");

exports.getUserByID = async (id) => {
  // For loggin in by Postman
  data = await user.findAll({
    where: { id },
  });

  if (data.length > 0) {
    return data[0];
  } else {
    throw new Error(`User is not found!`);
  }
};

exports.getUserByEmail = async (email) => {
  // For loggin in by the web as a regular user
  data = await user.findAll({
    where: {
      email,
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
  data = await user.findAll({
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
  const data = await user.create(payload);
  return data;
};

exports.changePassword = async (id, payload) => {
  payload.password = bcrypt.hashSync(payload.password, 10);

  await user.update(payload, {
    where: {
      id,
    },
  });

  // Get data from db to show it to Postman
  const data = await user.findAll({
    where: {
      id,
    },
  });

  if (data.length > 0) {
    return data[0];
  } else {
    throw new Error(`User is not found!`);
  }
};
