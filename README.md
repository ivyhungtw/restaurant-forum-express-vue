# Restaurant Forum

![](/public/photos/restaurants.png)

Restaurant Forum is a web app for users to explore restaurants. The backend is built with Node.js, Express, and mySQL and the frontend is built with Vue3. For the frontend code, please refer to [ivyhungtw/restaurant-forum-vue](https://github.com/ivyhungtw/restaurant-forum-vue) repo.

🚀 Restaurant Forum is now live on Heroku, feel free to try it out: https://forum-express-vue.herokuapp.com/

You can use the default accounts below or register your own account to login:

```
email: root@example.com/user2@example.com
password: 12345678
```

## Features

Users and admin must log in before accessing any pages. Users can register an account by providing name, email, and password.

After login, users can:

- View all restaurants and filter them by category
- View restaurant's detail page
- View latest restaurants and comments
- View users with most followers
- Create comments for a restaurant
- Save restaurants to their favorite list or remove them
- Like and unlike restaurants
- Follow and unfollow other users
- View users' profile with information of their followers, followings, saved, and liked restaurants
- Edit their own profile

After login, admin can:

- Create/Read/Update/Delete restaurants
- Create/Read/Update/Delete categories
- Update users' role
- Delete users' comments

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Vue3](https://v3.vuejs.org/)
- [Node.js v14.15.1](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [mySQL](https://www.mysql.com/)

## Install Restaurant Forum

#### Clone the repository locally

```
$ git clone https://github.com/ivyhungtw/restaurant-forum-express-vue.git
```

#### Install project dependencies

```
$ cd restaurant-forum-express-vue
$ npm install
```

#### Add .env file

To properly use the app and login feature, make sure you have filled out the following information in .env file.

You can register your own IMGUR client id on [IMGUR](https://api.imgur.com/oauth2/addclient).

```
IMGUR_CLIENT_ID=SKIP
JWT_SECRET=SKIP
```

## Use Restaurant Forum

#### Enter your MySQL Workbench password in config.json file

```
{
  "development": {
    "username": "root",
    "password": "<your_mysql_workbench_password>",
    "database": "forum",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
```

#### Create database in MySQL

To create database for development and test, run the following syntax in MySQL Workbench.

```
drop database if exists forum;
create database forum;
```

#### Use Sequelize CLI to create tables in database

```
$ npx sequelize db:migrate
```

#### Import seed data

To have default users, categories, and restaurants set up, run the following script.

```
$ npm run seed
```

#### Start the app

If you have installed [nodemon](https://www.npmjs.com/package/nodemon), run the following script.

```
$ npm run dev
```

or just run:

```
$ node app.js
```

The server will start running on http://localhost:3000/
