# Class-Management-System

Class Management System in form of web application using Node.js, Express and MongoDB

**************************************************************************
                         DEVELOPMENT ONGOING....
**************************************************************************
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

#Technology
- Node.js
- HTML5/CSS3
- Template Engine EJS
- JavaScript
- Mongodb Atlas [Cloud]

#FRONTEND
- User login
- Admin dashboard, View all users, Add new user, Modify users
- Student dashboard
- Employee dashboard, Create Class & Assign teacher
- Teacher dashboard, Add students to class, Create a post

#BACKEND
- Server & Mongodb setting up
- Setting up environment variables
- Handleing Error [improving]
- Hasing all passwords on save
- User/Adimn Authentication
- Role based cookie authorization on different routes
- Data validation before saving
- Relational database model

#NPM_DEPENDENCIES

- express
- mongoose
- bcrypt
- ejs
- dotenv
- express-ejs-layouts
- cookie-parser
- jsonwebtoken
- validator
