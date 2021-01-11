# Project comands

- Install the dependencies -  `npm install`
- Rename .env.example to .env. 
- Run the project in development mode - `npm run dev`

# some comands and shortcuts

- Ctrl + k + c/u  comment out code




# installed packages

- npm install
- npm install dotenv
- npm init -y
- npm install express --save
- npm install mongoose --save
- npm install ejs
- npm install nodemon --save-dev
- npm install express-session
- npm install bcrypt
- mongoimport --db recipes --collection recipes --file 15minRecipes.json --jsonArray
- db.recipes.update({}, {$unset: {id:1}},{multi: true});                                        this one to remove id field from collection
- db.recipes.aggregate([{$group: {_id: "$tags"}},{$project: {name: "$_id", "_id" : 0}},])       aggregation command
- db.collection("tags").aggregate([{$unwind: "$tags"},{$group: {_id: "$tags"}},{$project: {name: "$_id", "_id" : 0}},]).toArray()
- db.recipes.find({"name": "0001"})                             find with specific document
- 