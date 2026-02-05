# 🔐 TaskVault — Secure MERN Todo Application

TaskVault is a **full-stack MERN Todo application** built with a strong focus on **authentication, security, and real-world backend practices**.  
It supports **user signup/login**, **JWT-based authentication**, **password hashing with bcrypt**, and **secure task management** where each user can manage only their own tasks.

This project was built as a **learning + portfolio project** to understand how real production-style apps handle:

- Authentication & Authorization
- Secure password storage
- Protected routes
- Environment variables & config management
- Full-stack integration (React + Node + MongoDB)

---

## 🚀 Features

- ✅ **User Authentication**: Secure signup and login system
- 🔐 **JWT-based Sessions**: Stateless authentication using JSON Web Tokens
- 🔒 **Password Security**: Industry-standard bcrypt hashing with salt rounds
- 🍪 **HttpOnly Cookies**: Prevents XSS attacks by storing tokens securely
- 🧾 **Full CRUD Operations**: Create, read, update, and delete tasks
- 👤 **User Isolation**: Each user can only access their own tasks
- 🛡️ **Protected Routes**: Middleware-based authorization
- ⚙️ **Environment Configuration**: Secure credential management with dotenv
- 🌐 **CORS Security**: Configured cross-origin resource sharing
- 📱 **Responsive Design**: Mobile-friendly interface
- ✨ **Smart Validations**: Duplicate email prevention, input validation
- 🎯 **Loading States**: Better UX with loading indicators

---

## 🛠️ Tech Stack

### Frontend

- **React** - Component-based UI library
- **React Router** - Client-side routing
- **CSS3** - Modern responsive styling

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (Native Driver)
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **cookie-parser** - Cookie handling
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

### Deployment

- **Frontend**: Vercel
- **Backend**: Vercel (Serverless Functions)
- **Database**: MongoDB Atlas

---

## 🏗️ Architecture & Design Decisions

### Authentication Flow

- **Stateless JWT Authentication**: Scalable token-based system suitable for microservices
- **HttpOnly Cookies**: Prevents client-side JavaScript access to tokens (XSS protection)
- **Password Security**: Bcrypt with configurable salt rounds for one-way hashing
- **Token Expiration**: 24-hour token lifespan with automatic session management
- **Middleware Protection**: All task routes require valid JWT authentication

### Security Best Practices

- ✅ Environment variables for all sensitive credentials
- ✅ CORS whitelist to prevent unauthorized access
- ✅ Input validation and sanitization on both client and server
- ✅ User-specific data isolation via MongoDB queries
- ✅ Secure password requirements and hashing
- ✅ Error messages that don't leak system information

### Database Design

- **Users Collection**: Stores user credentials, profile data, and timestamps
- **Tasks Collection**: Contains userId reference for relationship mapping
- **Efficient Queries**: MongoDB native driver with optimized indexing

### Frontend Architecture

- **Component-based structure**: Modular and reusable React components
- **Centralized API config**: Single source of truth for backend URLs
- **State management**: React hooks for authentication and task data
- **Loading states**: Better UX during async operations
- **Error handling**: User-friendly error messages and redirects

---

## 📂 Project Structure

```
TaskVault/
├── backend/
│   ├── index.js                 # Express server & API routes
│   ├── vercel.json              # Vercel deployment config
│   ├── package.json
│   ├── package-lock.json
│   └── .env                     # Environment variables (gitignored)
├── frontend/
│   └── ToDo-Frontend/
│       ├── src/
│       │   ├── components/      # React components (Login, Signup, Tasks, etc.)
│       │   ├── config.js        # API configuration
│       │   ├── App.jsx          # Main app component
│       │   ├── main.jsx 
│       │   └── index.css        # Global styles
│       ├── vercel.json          # Vercel rewrites for routing
│       ├── eslint.config.js
│       ├── index.html
│       ├── vite.config.js
│       ├── package-lock.json
│       └── package.json
├── LICENSE
└── README.md
```

---

## 🚀 Live Demo

**Application**: [https://task-vault-phi.vercel.app](https://task-vault-phi.vercel.app)

> *Create a free account to explore all features!*

---

## 💻 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone https://github.com/nancysangani/TaskVault.git
cd TaskVault
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=3200
MONGO_URL=your_mongodb_connection_string
DB_NAME=todoApp
JWT_SECRET=your_super_secret_jwt_key
SALT_ROUNDS=10
CORS_ORIGIN=http://localhost:5173
```

Start the backend server:

```bash
npm start
```

Server runs on `http://localhost:3200`

### 3. Frontend Setup

```bash
cd frontend/ToDo-Frontend
npm install
```

Update `src/config.js` with your backend URL:

```javascript
const API_URL = "http://localhost:3200";
export default API_URL;
```

Start the development server:

```bash
npm run dev
```

App runs on `http://localhost:5173`

---

## 🧪 Testing

### Functional Testing Checklist

- ✅ User registration with all required fields
- ✅ Duplicate email prevention and error handling
- ✅ Password hashing verification in database
- ✅ Login with valid/invalid credentials
- ✅ JWT token generation and storage
- ✅ Protected route authorization
- ✅ Create, read, update, delete tasks
- ✅ User data isolation (can't see other users' tasks)
- ✅ Session persistence across page refreshes
- ✅ Logout and session clearing
- ✅ Responsive design on mobile devices
- ✅ Loading states during API calls

---

## 🎯 Key Learnings & Takeaways

Building TaskVault taught me:

### Backend Development

- **Authentication patterns** used in production applications
- **Secure credential storage** with bcrypt and environment variables
- **JWT lifecycle management** (generation, validation, expiration)
- **RESTful API design** principles and best practices
- **Database schema design** for user relationships
- **Middleware architecture** for route protection
- **Error handling** and meaningful status codes

### Frontend Development

- **React Router** for protected routes and navigation
- **State management** for authentication flows
- **Async operations** with loading and error states
- **Form validation** and user feedback
- **Cookie handling** in the browser
- **Responsive design** for cross-device compatibility

### DevOps & Deployment

- **Environment-based configuration** for dev/prod environments
- **Cloud deployment** on Vercel and MongoDB Atlas
- **CORS configuration** for cross-origin requests
- **Vercel rewrites** for handling client-side routing
- **Serverless functions** for backend deployment

### Software Engineering Practices

- **Security-first mindset** in application design
- **Clean code** and modular architecture
- **Git workflow** and version control
- **Documentation** for future maintainability

---

## 🔮 Future Enhancements

- [ ] **Email Verification**: Confirm user email on signup
- [ ] **Password Reset**: Forgot password functionality via email
- [ ] **OAuth Integration**: Login with Google/GitHub
- [ ] **Task Categories**: Organize tasks with tags and categories
- [ ] **Due Dates & Reminders**: Task deadline tracking
- [ ] **Search & Filter**: Find tasks quickly
- [ ] **Dark Mode**: Theme toggle for better UX
- [ ] **Task Priority**: High/medium/low priority levels
- [ ] **Real-time Updates**: WebSocket integration for live collaboration
- [ ] **Rate Limiting**: Prevent API abuse
- [ ] **Unit & Integration Tests**: Jest and React Testing Library
- [ ] **CI/CD Pipeline**: Automated testing and deployment
- [ ] **Mobile App**: React Native version
- [ ] **Data Export**: Download tasks as CSV/PDF

---

## 🐛 Known Issues & Limitations

- Cookie-based sessions don't persist across different browsers
- No password strength indicator on signup form
- Limited error message detail on frontend
- No email notification system
- Task list doesn't support pagination (may slow with 100+ tasks)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Nancy Sangani**

- GitHub: [@nancysangani](https://github.com/nancysangani)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/nancy-sangani-a2938132b)

---

## 🙏 Acknowledgments

- **MongoDB** documentation for database best practices
- **JWT.io** for authentication insights and debugging
- **Vercel** for seamless deployment platform
- **React** community for frontend development patterns
- **Stack Overflow** community for troubleshooting help

---

## 📧 Contact & Collaboration

I'm open to feedback, collaborations, and opportunities!

- **Email**: nancysangani299@gmail.com
- **LinkedIn**: [Nancy Sangani](https://www.linkedin.com/in/nancy-sangani-a2938132b)

---

**⭐ If you found this project helpful or interesting, please consider giving it a star! It helps others discover the project.**

---

**Built with 💜 by Nancy Sangani**
