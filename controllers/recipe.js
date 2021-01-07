const Recipe = require("../models/Recipe");

exports.list = async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.render("recipes", { recipes: recipes});
    } catch (e) {
        res.status(404).send({ message: "could not list recipes"});
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
        try {
        await DataTransfer.findByIdAndRemove(id);
        res.redirect("/recipes");
    } catch (e) {
        res.status(404).send({
            message: `could not delete record ${id}.`,
        });
    }
}

exports.create = async (req, res) => {
    let recipe = new Recipe({ name: req.body.name});
    try {
        await recipe.save();
        res.redirect('/recipes/?message=recipe has been created')
    } catch (e) {
        return res.status(400).send({
            message: JSON.parse(e),
        });
    }
}