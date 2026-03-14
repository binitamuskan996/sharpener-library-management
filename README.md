# Library Management System

A **Node.js** and **Sequelize** based Library Management System that allows admins to manage books and users, and users to issue and return books with automatic fine calculation.  

This project is a capstone project to demonstrate full-stack backend and frontend skills.

---

## 🔗 Live Link
> Currently, this project runs locally. You can run it using the instructions below.

---

## 📂 Project Structure
/models - Sequelize models (User, Book, BookIssue)
/controllers - API logic (Books, Admin, Users)
/routes - Routes for admin and user
/middleware - JWT authentication middleware
/public - Frontend HTML, CSS, JS files
/utils - Utility functions
app.js - Main Express server

---

## ⚙️ Features

### **Admin**
- Add, update, and delete books.
- View all books with available copies.
- View issued books and calculate fine.
- View returned books (fine report).
- View all users and change their role (admin/user).

### **User**
- Register and login.
- View all available books.
- Issue a book (if available).
- Return a book (fine is calculated automatically).
- Search for books by name.
- View issued and returned books.

---

## 💻 Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MySQL (Sequelize ORM)
- **Frontend:** HTML, CSS, JavaScript, Axios
- **Authentication:** JWT (JSON Web Tokens)

---

## 🚀 Getting Started (Run Locally)

1. Clone the repo:
```bash
git clone <YOUR_REPO_URL>
cd sharpener-library-management
Install dependencies:

npm install

Create a .env file in the root:

DB_NAME=<your_database_name>
DB_USER=<your_database_user>
DB_PASSWORD=<your_password>
JWT_SECRET=librarysecret

Run the server:

npm start

Open the frontend in your browser:

admin.html for Admin Panel

login.html for User Panel

📸 Screenshots

Admin Dashboard


User Panel


Issued Books & Fine Report


🎯 Capstone Objective

Build a real-life application to manage library operations.

Demonstrate backend skills with Node.js, database handling, and authentication.

Showcase frontend interaction with API using Axios.

📝 Notes

Currently hosted locally. You can deploy on aws or any other platform for live access.

Fine is calculated automatically:
₹10 per hour after the first hour of issuing.

Admin and User panels are separate for security and better UX.

🔗 GitHub Repo



✅ Author

Binita Kumari
Email: binitamuskan12@gmail.com


---  

---
