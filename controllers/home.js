const List = require('../models/List');

exports.list = async (req, res) => {
    console.log(req.session+"req.session working");
    try {
        const totalList = await List.find({});              //.count() removed
        res.render("index", {totalList: totalList})
    } catch (e) {
        console.log(e);
        res.status(404).send({
            message:`error rendering page, home controller`,
        });
    }
    
}