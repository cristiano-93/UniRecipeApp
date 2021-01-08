const RecipeList = require("../models/Recipe");

exports.list = async (req, res) => {
    try {
        const recipe = await RecipeList.find({}).sort({'name':1});
        res.render("recipeList", { recipe: recipe });
    } catch (e) {
        res.status(404).send({ message: "could not list recipes" });
    }
};

exports.create = async (req, res) => {
    let recipe = new RecipeList({ name: req.body.name });
    try {
        await recipe.save();
        res.redirect('/recipes/?message=recipe has been created')
    } catch (e) {
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        const recipe = await Recipes.updateOne({ _id: id }, req.body);
        res.redirect('/recipes/?message=recipe has been updated');
    } catch (e) {
        res.status(404).send({
            message: `could find taster ${id}.`,
        });
    }
};


