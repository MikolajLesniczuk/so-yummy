const Categories = require("../models/categories.model");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find();
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
};
