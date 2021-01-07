# Project comands

- Install the dependencies -  `npm install`
- Rename .env.example to .env. 
- If this is your first time getting started then run the seeder - `node seeder`
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
- mongoimport --db recipes --collection recipes --file 15minRecipes.json --jsonArray
- db.recipes.update({}, {$unset: {id:1}},{multi: true});   this one to remove id field from collection
- 