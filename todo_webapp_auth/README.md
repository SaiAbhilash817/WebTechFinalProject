# 📝 Task To-Do WebApp with Login & Authentication (v4)

A full-stack **Task Management Web Application** built using **Node.js**, **Express**, **MongoDB**, and **Bootstrap**.  
Users can register, log in, and manage their personal tasks — including setting deadlines, priorities, and optional descriptions.

## 🚀 Features

- 👤 **User Authentication**
  - Secure register and login system using JWT
  - Passwords encrypted with bcrypt

- ✅ **Task Management**
  - Add, Edit, Delete, and Mark tasks as complete
  - Optional task **description**
  - Deadline and Priority fields
  - Priority color tags (High = 🔴, Medium = 🟠, Low = 🟢)

- 🎨 **Professional UI**
  - Responsive and clean Bootstrap 5 design
  - Simple layout for desktop and mobile
  - Auto-refresh after add/update/delete

- 🧩 **Tech Stack**
  - **Frontend:** HTML, CSS, JavaScript, Bootstrap 5
  - **Backend:** Node.js, Express.js
  - **Database:** MongoDB (Local)
  - **Auth:** JSON Web Token (JWT)

## ⚙️ Installation & Setup

### 1️⃣ Clone or Download
```bash
git clone https://github.com/yourusername/task_todo_webapp_auth_v4.git
cd task_todo_webapp_auth_v4
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Create `.env` File
In the project root, create a file named `.env` with:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/task_todo_auth
JWT_SECRET=mysecretkey
PORT=3000
```

### 4️⃣ Run the Server
```bash
node server.js
```
or, if you installed nodemon:
```bash
npx nodemon server.js
```

## 🌐 Usage

1. Open your browser and go to  
   👉 `http://localhost:3000/auth/register.html`

2. Register a new user and log in.

3. You’ll be redirected to your **Task Dashboard** where you can:
   - ➕ Add new tasks with title, description, deadline, and priority
   - 🖊️ Edit existing tasks
   - ✅ Mark tasks as complete
   - ❌ Delete tasks
   - 🚪 Log out securely

## 🧠 Project Structure

```
task_todo_webapp_auth_v4/
├── server.js
├── package.json
├── .env
├── models/
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── public/
│   ├── auth/
│   │   ├── login.html
│   │   └── register.html
│   ├── index.html
│   ├── js/
│   │   └── main.js
│   └── css/
│       └── style.css
└── README.md
```

## 🧪 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|-----------|--------------|----------------|
| POST | `/api/auth/register` | Register new user | ❌ No |
| POST | `/api/auth/login` | Login user & get token | ❌ No |
| GET | `/api/tasks` | Get all user tasks | ✅ Yes |
| POST | `/api/tasks` | Add a new task | ✅ Yes |
| PUT | `/api/tasks/:id` | Update a task | ✅ Yes |
| DELETE | `/api/tasks/:id` | Delete a task | ✅ Yes |

## 🧰 Requirements

- Node.js (v18+ recommended)
- MongoDB running locally (default port 27017)
- Internet connection for Bootstrap/CDN

## 💡 Future Improvements

- User profile & settings
- Task categories / tags
- Dark mode toggle
- Drag & drop task ordering
- Email reminders before deadlines

## 👨‍💻 Author

**Developed by:** *Sians Dragon*  
🗓️ Version: 4.0 (November 2025)

## 📜 License

This project is open source and available under the **MIT License**.
