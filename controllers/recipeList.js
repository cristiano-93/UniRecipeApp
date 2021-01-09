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
        const recipe = await Recipes.updateOne({ _id: id }, req.body);
        res.redirect('/recipes/?message=recipe has been updated');
    } catch (e) {
        res.status(404).send({
            message: `could find taster ${id}.`,
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
