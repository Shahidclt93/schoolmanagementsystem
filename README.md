# School Management System

A full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) application for managing students, staff, and librarians within a school environment. This system includes CRUD operations and profile management for each role.

## Project Description
The School Management System provides:
- **Backend**: RESTful API for managing data.
- **Frontend**: A React-based UI for interacting with the system.
- **Roles**: Admins can manage students, staff, and librarians, including viewing and editing profiles.

### Features:
- Secure authentication (JWT & bcrypt).
- Role-based pages: Dashboard, Students, Staffs, Librarians.
- Dynamic routing for profile pages.
- State management with Redux Toolkit.
- Form validation with Formik and Yup.

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (installed locally or use MongoDB Atlas)

### 1. Clone the Repository
```bash
https://github.com/your-repository-link.git
cd school-management-system
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (see below).
4. Run the backend server:
   ```bash
   npm run dev
   ```
   Backend will run on **http://localhost:5000**.

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   Frontend will run on **http://localhost:3000**.

---

## .env File
Create a `.env` file in the backend folder with the following variables:
```plaintext
PORT=4000
MONGODB_URI=mongodb+srv://shahidclt93:kRSofpdEw4mnzb0a@cluster0.6ybxz.mongodb.net/
JWT_SECRET="dfafs9djh"
```

---

## List of Libraries

### Backend
- **express**: Fast and minimalist web framework.
- **mongoose**: MongoDB ODM.
- **jsonwebtoken**: JWT for authentication.
- **bcrypt**: Password hashing.
- **dotenv**: Environment variable management.
- **cors**: Cross-origin resource sharing.
- **helmet**: Security headers.
- **morgan**: HTTP request logger.
- **body-parser**: Parse incoming request bodies.
- **nodemon**: Auto-restart server during development.

### Frontend
- **react**: Frontend library for building UI.
- **react-router-dom**: Routing for React.
- **reduxjs/toolkit**: State management.
- **react-redux**: Redux bindings for React.
- **axios**: HTTP client for API requests.
- **formik**: Form handling.
- **yup**: Schema-based form validation.
- **react-icons**: Icons for UI components.

---

## Routes

### Frontend Routes:
| Route                   | Component                |
|-------------------------|--------------------------|
| `/dashboard`            | Dashboard                |
| `/staffs`               | StaffsPage               |
| `/students`             | StudentsPage             |
| `/librarians`           | LibrariansPage           |
| `/student/:id`          | StudentProfilePage       |
| `/staff/:id`            | StaffProfilePage         |
| `/librarian/:id`        | LibrarianProfilePage     |

---

## Relevant Information
- **Frontend Port**: `5173`
- **Backend Port**: `4000`
- **Database**: MongoDB (Local/Atlas)


