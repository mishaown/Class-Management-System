# Class Management System

A web application built using **Node.js**, **Express**, and **MongoDB** for managing classes, users, and roles within an educational or organizational setting.

==> This project is **no longer actively maintained**. However, if you're interested in contributing, enhancing features, or using it as a base for your projects, feel free to fork and build upon it! It’s a great resource for **bachelor's students** or anyone looking to explore web development with Node.js, Express, and MongoDB. Contributions and improvements are always welcome! 🚀
---

## Features

### **Frontend**
- **User Login**: Secure login for users, admins, students, and teachers.
- **Admin Dashboard**: 
  - View all users.
  - Add new users.
  - Modify user details.
- **Student Dashboard**: Access student-specific information.
- **Employee Dashboard**:
  - Create classes.
  - Assign teachers to classes.
- **Teacher Dashboard**:
  - Add students to classes.
  - Create and manage posts.
 
### **ROUTES**
Three different types of user have different sets of accessibility.
ADMIN: Currently admin routes are not protected.
- http://localhost:8888/admin/create - Creates a new user
- http://localhost:8888/admin/users - Shows all the registered users
- http://localhost:8888/admin/modify - Shows all users and can modify user info
USERS:
- http://localhost:8888/login - user login page
Employee, Teacher or Student if not logged in can’t access routes. Based on login data, user
will get a different interface.
Employee:
- http://localhost:8888/employee/classmanage - creates a class and assigns it to a teacher
Teacher:
- http://localhost:8888/teacher/myarticles - Can create article
- http://localhost:8888/teacher/myclasses - Can see enrolled classes
- http://localhost:8888/teacher/myclasses/_id - Can add students to a class
- http://localhost:8888/teacher/myclasses/t-a/_id - Can take attendance of enrolled students
- http://localhost:8888/teacher/attendance_activity - Shows attendance activity

### **Backend**
- **Server & Database Setup**: Configured with MongoDB Atlas (cloud-based).
- **Environment Variables**: Secure handling of sensitive data using `.env`.
- **Error Handling**: Improved error management for better user experience.
- **Password Security**: Passwords are hashed before saving to the database.
- **Authentication & Authorization**:
  - User and admin authentication.
  - Role-based cookie authorization for different routes.
- **Data Validation**: Ensures data integrity before saving to the database.
- **Relational Database Model**: Structured data relationships for efficient management.

---

## Getting Started

### Prerequisites
- Node.js installed.
- MongoDB Atlas account (or local MongoDB instance).

### Setup
1. **Create `.env` File**:
   - Create a file named `.env` in the root directory.
   - Add the following environment variables:
     ```env
     PORT= [Your localhost port]
     DB_URL= [Your MongoDB connection URL]
     TOKEN_SECRET= [Any secret text for JWT]
     ```

2. **Install Dependencies**:
   Run the following command to install required packages:
   ```bash
   npm install
   ```

3. **Start the Project**:
   - For development mode:
     ```bash
     npm run dev
     ```
   - For production mode:
     ```bash
     npm start
     ```

---

## Project Structure

![](public/CMS_diagram.jpg)

---

## Technologies Used

- **Frontend**:
  - HTML5, CSS3
  - EJS (Template Engine)
  - JavaScript

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB Atlas (Cloud Database)

- **Authentication**:
  - JSON Web Tokens (JWT)
  - Cookie-based authorization

- **Security**:
  - Password hashing with `bcrypt`.
  - Data validation using `validator`.

---

## NPM Dependencies

- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling for Node.js.
- `bcrypt`: Password hashing.
- `ejs`: Template engine for rendering HTML.
- `dotenv`: Loads environment variables from `.env`.
- `express-ejs-layouts`: Layout support for EJS.
- `cookie-parser`: Parse HTTP request cookies.
- `jsonwebtoken`: Generate and verify JWTs.
- `validator`: String validation and sanitization.

## Author

Developed by **M.i Shaown**.

---

## License

This project is open-source and free to use. Feel free to modify and distribute as needed.
