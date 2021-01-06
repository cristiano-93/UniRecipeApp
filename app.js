//Setting up the variables
const mongoose = require("mongoose");
const { WEB_PORT, MONGODBURI } = process.env;
const recipeController = require("./controllers/recipe");
const app = express();


mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

mongoose.connection.on("error", (err) => {
    console.error(err);
    console.log("MongoDB connection error, make sure MongoDB is running.",);
    process.exit();
});

/***
 * We are applying our middlewear
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))


app.set("view engine", "ejs");



app.get("/recipes", recipeController.list);
app.get("/", recipeController.list);
app.get("/recipes/delete/:id", recipeController.delete);
