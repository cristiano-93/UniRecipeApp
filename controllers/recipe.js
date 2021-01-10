const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const Step = require("../models/Step");
const Tag = require("../models/Tag");
const bodyParser = require("body-parser");
const { db } = require("../models/Tag");


exports.view = async (req, res) => {
    const id = req.params.id;
    try {
        const recipe = await Recipe.findById(id);
        res.render('recipe', { recipe: recipe, id: id });
    } catch (e) {
        res.status(404).send({
            message: `could not find recipe ${id}.`,
        });
    }
};

exports.create = async (req, res) => {
    try {
        const recipe = new Recipe({
            name: req.body.name,
            n_minutes: req.body.n_minutes,
            n_steps: req.body.n_steps,
            n_ingredients: req.body.n_ingredients,
            tags: req.body.tags.split(","),
            ingredients: req.body.ingredients.split(","),
            description: req.body.description,
            steps: req.body.steps.split(",")
        });
        await recipe.save();
        res.redirect('/recipeList/?message=recipe has been created');
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            res, render('create-recipe', { errors: e.errors })
            return;
        }
        return res.status(400).send({
            message: JSON.parse(e),
        });
    };
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

exports.tags = async (req, res) => {
    try {
        db.collection("recipes").aggregate([
            { $group: { _id: "$tags" } },
            { $project: { name: "$_id", "_id": 0 } },
            { $out: "tags" }
        ])
    } catch (e) {

    }
}