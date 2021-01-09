const Recipe = require("../models/Recipe");
const bodyParser = require("body-parser");

exports.view = async (req, res) => {
        const id = req.params.id;
        try {
            const recipe = await Recipe.findById(id);
            res.render('recipe', {recipe: recipe, id: id});
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
                tags: req.body.tags,
                ingredients: req.body.ingredients,
                description: req.body.description,
                steps: req.body.steps 
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

