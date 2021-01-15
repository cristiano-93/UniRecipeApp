//Setting up the variables
const dotenv = require("dotenv");
dotenv.config({ path: '.env' });
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const expressSession = require("express-session");


const path = require("path");
const app = express();
const User = require("./models/User");
app.set("view engine", "ejs");

//connecting
const MONGODB_URI = process.env;
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port);


//controllers
const homeController = require("./controllers/home");
const recipeController = require("./controllers/recipe");
const recipeListController = require("./controllers/recipeList");
const userController = require("./controllers/user");
const recipeApiController = require("./controllers/api/recipe");
//const server = require('http').createServer(app);

//connecting to the database
mongoose.connect('mongodb+srv://admin:admin@unirecipecluster.ix1lf.mongodb.net/UniRecipes?retryWrites=true&w=majority', { useUnifiedTopology: true } );
//mongoose.connect(, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log(
        "MongoDB connection error. Please make sure MongoDB is running."
    );
    process.exit();
});



// applying the middlewear
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({ secret: 'web app', cookie: { expires: new Date(253402300000000) } }));

app.use("*", async (req, res, next) => {
    global.user = false;
    if (req.session.userID && !global.user) {
        const user = await User.findById(req.session.userID);
        global.user = user;
    }
    next();
})

const authMiddleware = async (req, res, next) => {
    const user = await User.findById(req.session.userID);
    if (!user) {
        return res.redirect('/');
    }
    next()
}




// setting up the pages


app.get("/", homeController.list);

app.get("/recipeList", recipeListController.list);
app.get("/recipeList/delete/:id", recipeListController.delete);

app.get("/recipe/view/:id", recipeController.view);
app.get("/recipe/update/:id", recipeController.edit);
app.post("/recipe/update/:id", recipeController.update);

app.get("/create-recipe", (req, res) => {
    res.render("create-recipe", { errors: {} });
});
app.post("/create-recipe", recipeController.create);

app.get("/search-recipe", (req, res) => {
    res.render('search-recipe', recipeApiController);
});
app.get("/api/search-recipe", recipeApiController.list);

app.get("api/recipe");

//user login/registration

app.get("/register", (req, res) => {
    res.render('create-user', { errors: {} })
});

app.post("/register", userController.create);

app.get("/login", (req, res) => {
    res.render('login-user', { errors: {} })
});
app.post("/login", userController.login);

app.get("/logout", async (req, res) => {
    req.session.destroy();
    global.user = false;
    res.redirect('/');
});

