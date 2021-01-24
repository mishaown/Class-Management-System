# Class-Management-System

Class Management System in form of web application using Node.js, Express and MongoDB

*************************
To start the project.

1. create file and name it '.env' and type following texts

            PORT= [Your locahost port]
            DB_URL= [Your mongodb database location]
            TOKEN_SECRET = [Give any secret text]
 
 2. run this commmand: 'npm install'  [will install required dependencies]
 
 3. run this command: 'npm run dev' or 'npm start'  [will start the project]
 
*************************

Develeopment Ongoing:
--------------------

#Project Structure: 

![](public/CMS_diagram.jpg)


#FRONTEND
- Template Engine EJS
- Admin Login, Logout, Dashboard, View all users, Add new user, Modify users
- User Login, Dashboard

#BACKEND
- Server & Mongodb setup
- Set up Environment Variables
- Handleing Error [improving]
- Hasing all passwords on save
- User/Adimn Authentication
- Cookie based Authorization on different routes
- Role based page Authorization

#NPM_DEPENDENCIES

- express
- mongoose
- bcrypt
- ejs
- dotenv
- express-ejs-layouts
- cookie-parser
- jsonwebtoken
- validator"
