const Recipe = require("../models/Recipe");
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
            minutes: req.body.n_minutes,
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

exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
      const recipe = await Recipe.findById(id);
      res.render('update-recipe', { recipe: recipe, id: id });
    } catch (e) {
      res.status(404).send({
        message: `edit: could not find recipe ${id}.`,
      });
    }
  };
  
  exports.update = async (req, res) => {
    const id = req.params.id;
    try {
      const recipe = await Recipe.updateOne({ _id: id }, req.body);
      res.redirect('/recipeList/?message=recipe has been updated');
    } catch (e) {
      res.status(404).send({
        message: `update: could not find recipe ${id}.`,
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