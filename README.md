# 🧭 Lost No More

A community-powered lost and found platform built with **Next.js**, **Express.js**, **MongoDB**, and **Node.js**.  
Designed for users to report lost or found items and reconnect with their belongings.

---

## 🚀 Features

- 🧑‍💻 **User Authentication**
  - Sign up and log in using `@chitkarauniversity.edu.in` emails only
  - JWT-based session management

- 📋 **Report Lost or Found Items**
  - Upload item details with optional image
  - Automatically saves location and contact number
  - Report type: `Lost`, `Found`, or `Returned`

- 🔎 **Dashboard**
  - View all lost and found reports
  - Filter by type and see reporter details

- 🛎️ **Notifications**
  - Users are alerted when a new item is reported

- 🖼️ **Image Upload**
  - Uses **Multer** and **Cloudinary** for seamless image uploads

---

## 📸 Screenshots

### Landing Page
![Landing Page](/screenshots/Landing.png)

### Login Page
![Login Page](/screenshots/Login.png)

### Signup Page
![Signup Page](/screenshots/Signup.png)

### Dashboard Page
![Dashboard View](/screenshots/Dashboard.png)

### Report Item Form
![Report Item Form](/screenshots/reportform.png)

---

## 🧱 Tech Stack

| Layer         | Tech                                |
|--------------|--------------------------------------|
| Frontend     | Next.js (App Router) + TailwindCSS   |
| Backend      | Express.js + Node.js                 |
| Database     | MongoDB + Mongoose                   |
| Image Upload | Multer + Cloudinary                  |
| Auth         | JWT + Cookie Tokens                  |

---