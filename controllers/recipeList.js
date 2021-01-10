const Recipe = require("../models/Recipe");
const RecipeList = require("../models/Recipe");

exports.list = async (req, res) => {
    try {
        const recipe = await RecipeList.find({}).sort({'name':1});
        res.render("recipeList", { recipe: recipe });
    } catch (e) {
        res.status(404).send({ message: "could not list recipes" });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const tags = await Tag.find({});
        const steps = await Step.find({});
        const ingredients = await Ingredient.find({});
        const recipe = await Recipes.findById(id);
        if (!recipe) throw Error('couldnt find recipe');
        res.render('update-recipe', {
            recipe: recipe,
            tags: tags,
            steps: steps,
            ingredients: ingredients,
            error: {}
        });
    } catch (e) {
        console.log(e);
        if (e.errors) {
            res.render('update-recipe', { errors: e.errors })
            return;
        }
        res.status(404).send({
            message: `could not find recipe ${id}.`,
        });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const recipe = await Recipe.findByIdAndRemove(id);
        //await DataTransfer.findByIdAndRemove(id);
        res.redirect("/recipeList/?message=recipe has been deleted");
    } catch (e) {
        res.status(404).send({
            message: `could not delete record ${id}.`,
        });
    }
};
