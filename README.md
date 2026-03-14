# Library Management System

A **Node.js** and **Sequelize** based Library Management System that allows admins to manage books and users, and users to issue and return books with automatic fine calculation.  
This project is a capstone project to demonstrate full-stack backend and frontend skills.

---

## 🔗 Live Link

> Currently, this project runs locally. You can run it using the instructions below.

---

## 📂 Project Structure

```
/models        - Sequelize models (User, Book, BookIssue)
/controllers   - API logic (Books, Admin, Auth)
/routes        - Routes for admin,book and auth
/middleware    - JWT authentication middleware
/public        - Frontend HTML, CSS, JS files
/utils         - Utility functions
app.js         - Main Express server
```

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

1. **Clone the repo:**
```bash
git clone https://github.com/binitamuskan996/sharpener-library-management.git
cd sharpener-library-management
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure the database:**

Open the file `/utils/db-connection` and update it with your MySQL credentials:

```

> **Note:** The JWT secret is configured directly in the middleware. If you want to change it, update the `JWT_SECRET` value in `/middleware/auth.js`.

4. **Run the server:**
```bash
npm start
```

5. **Open the frontend in your browser:**
   - `admin.html` — Admin Panel
   - `login.html` — User Panel

---

## 📸 Screenshots

- Admin Dashboard
- User Panel
- Issued Books & Fine Report

---

## 🎯 Capstone Objective

- Build a real-life application to manage library operations.
- Demonstrate backend skills with Node.js, database handling, and authentication.
- Showcase frontend interaction with API using Axios.

---

## 📝 Notes

- Currently hosted locally. You can deploy on AWS or any other platform for live access.
- Fine is calculated automatically: **₹10 per hour** after the first hour of issuing.
- Admin and User panels are separate for security and better UX.

---

## 🔗 GitHub Repo

[https://github.com/binitamuskan996/sharpener-library-management](https://github.com/binitamuskan996/sharpener-library-management)

---

## ✅ Author

**Binita Kumari**  
📧 Email: binitamuskan12@gmail.com
