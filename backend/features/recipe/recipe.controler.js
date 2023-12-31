const { User: usersCollection } = require("../users/users.schema");
const { Recipe, Categories, Ingredients } = require("./recipe.model");

const getRecipe = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};
const getIngredients = async (req, res, next) => {
  try {
    const igredients = await Ingredients.find();
    res.status(200).json({ igredients });
  } catch (error) {
    next(error);
  }
};

const getOneRecipe = async (req, res, next) => {
  try {
    const category = req.params.category;
    const recipes = await Recipe.find({ category });

    if (!recipes) {
      return res.status(404).json({ message: "error" });
    }

    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};

const getOneRecipeById = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("id zconrolera", id);
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({ message: "error" });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Categories.find();
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

const searchRecipesByName = async (req, res, next) => {
  try {
    const name = req.query.name;
    const recipes = await Recipe.find();
    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};

const getFavRecipes = async (req, res, next) => {
  try {
    const userId = req.params.userid;
    const { favorites } = await usersCollection.findOne({ _id: userId });
    console.log(userId);
    if (favorites && favorites.length > 0) {
      const favoriteRecipes = await Recipe.find({ _id: { $in: favorites } });

      if (favoriteRecipes && favoriteRecipes.length > 0) {
        res.status(200).json({ favoriteRecipes });
      } else {
        res.status(404).json({ message: "Brak ulubionych przepisów." });
      }
    } else {
      res.status(404).json({ message: "Brak ulubionych przepisów." });
    }
  } catch (error) {
    next(error);
  }
};
const getOneFavRecipe = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeid;
    const recipes = await Recipe.find({ _id: recipeId });
    if (!recipes) {
      return res.status(404).json({ message: "error" });
    }

    res.status(200).json({ recipes });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getCategories,
  getRecipe,
  getOneRecipe,
  searchRecipesByName,
  getFavRecipes,
  getOneFavRecipe,
  getOneRecipeById,
  getIngredients,
};
