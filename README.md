# Project comands

- Install the dependencies -  `npm install`
- Rename .env.example to .env. 
- Run the project in development mode - `npm run dev`
- Project will run on port [port 8000](http://localhost:8000/)


# installed packages

- npm install dotenv
- npm init -y
- npm install express --save
- npm install mongoose --save
- npm install ejs
- npm install nodemon --save-dev
- npm install express-session
- npm install bcrypt

# MongoDB commands used

- mongoimport --db recipes --collection recipes --file 15minRecipes.json --jsonArray
- db.recipes.update({}, {$unset: {id:1}},{multi: true}) > this for every field not used
- db.recipes.aggregate([{$group: {_id: "$tags"}},{$project: {name: "$_id", "_id" : 0}},])
- db.collection("tags").aggregate([{$unwind: "$tags"},{$group: {_id: "$tags"}},{$project: {name: "$_id", "_id" : 0}},]).toArray()
- db.recipes.find({"name": "0001"})           
  