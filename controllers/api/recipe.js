const Recipe = require('../../models/Recipe');
exports.list =  async (req,res) => {
    
    const searchQuery = req.query.search;

    try {
        const Result =  await Recipe.find(
            { $text: { $search: searchQuery}},
         ).limit(50)
        res.json(Result);
        } catch (error) {
        console.log(error);
        res.status(404).send({
            message: `could not perform search`,
        });
    }
}