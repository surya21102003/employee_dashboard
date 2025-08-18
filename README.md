Employee Dashboard (MERN Stack)

A full-featured Employee Dashboard built with the MERN stack (MongoDB, Express.js, React.js, Node.js).
This project provides authentication, employee management, search and filter options, export functionality, and data visualization with charts — all inside a responsive and modern dashboard UI.

demo login credientials;
email : sonu@example.com
password: sonu

orelse you can register and then do login 

---

 Features

Authentication

JWT-based authentication (Login & Protected Routes)

Role-based access control (Admin/User)

(Google & Facebook OAuth planned, but API keys not configured)


Employee Management

Add, update, and delete employee records

View all employees in a structured table

Search & filter employees by name, email, or role

Export employee list as CSV


Dashboard UI

Modern responsive dashboard with an animated sidebar

Employee status charts (active, interns, roles, etc.)

Clean and user-friendly design


Additional Functionalities

Fully functional CRUD operations

Secure backend API using Express.js & MongoDB

Charts for employee activity & status overview




---

🛠 Tech Stack

Frontend: React.js, Tailwind CSS, Recharts (for charts)

Backend: Node.js, Express.js

Database: MongoDB (with Mongoose)

Authentication: JWT (JSON Web Token)

Other Tools: Multer (for file handling, if applicable), CSV export



---

 Project Structure

employee-dashboard/
│── backend/                 # Node.js + Express API
│---
├── models/              # Mongoose models
│   |---config/
|   |--model/
|   ├── routes/              # API routes
│   ├── controllers/         # Business logic
│   ├── middleware/          # JWT auth, error handling
│   └── server.js            # Entry point

│── frontend/                # React.js app
│   ├── src/
│   │   ├── components/      # Reusable UI components, Dashboard, Auth, Employee pages
│   │   ├── images/           # images
│   │   ├── services/        # API calls
│   │   └── App.js           # Main React app
│   └── public/


---

 Installation & Setup

1. Clone the repository

git clone https://github.com/your-username/employee-dashboard.git
cd employee-dashboard


2. Backend setup

cd backend
npm install
# Add .env file with your config:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
npm start


3. Frontend setup

cd frontend
npm install
npm start


4. Open app at:

Frontend: http://localhost:3000
Backend API: http://localhost:5000
