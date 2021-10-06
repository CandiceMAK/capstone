# Getting Started with MERN Project

This system is using React.js as front-end framework, and Node.js, MongoDB as backend server. This kind of project is called MERN project, which is one of the most popular way to create modern websites.

## Available Scripts

In the project directory, you can run:

### npm install

cd ./sever
npm init
npm install express mongoose dotenv nodemon bcrypt joi
npm install jsonwebtoken passport passport-jwt passport-local cors
npm install passport@0.3.2

cd ./client
npm react react-router-dom
npm axios

### create .env

cd ./sever
create .env

DB_CONNECT=mongodb+srv://<yourownsever>
PASSPORT_SECERT=<ANYKEY>

### `nodemon index.js`

cd ./sever
nodemon index.js

### `npm start`

cd ./client
npm start
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
