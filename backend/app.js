const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv/config");
const logger = require("morgan");
const connectDatabase = require("./config/connectDatabase");

const authRouter = require("./routes/authRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");
const staffRouter = require("./routes/staffRoutes.js");
const librarianRouter = require("./routes/librarianRoutes.js");


// App configuration
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet()); 
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", authRouter); // Authentication routes
app.use("/admin", adminRouter); // Admin routes
app.use("/staff", staffRouter); // Staff routes
app.use("/librarian", librarianRouter); // Librarian routes

// Connect database and start server
connectDatabase();
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));