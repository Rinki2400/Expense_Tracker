// // const express = require("express");
// // const cors = require("cors");
// // const dotenv = require("dotenv");
// // const connectDB = require("./config/db");

// // dotenv.config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // // Connect to MongoDB
// // connectDB();
// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:3000",
// //       "https://expense-tracker-oicsars44-rinki2400s-projects.vercel.app",
// //       "https://expense-tracker-three-flax.vercel.app", // new one
// //     ],
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     credentials: true,
// //   })
// // );

// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use("/uploads/avatars", express.static("uploads/avatars"));

// // app.use("/api/auth", require("./routes/authRoutes"));
// // app.use("/api/income", require("./routes/IncomeRoutes"));
// // app.use("/api/expense", require("./routes/ExpenseRoutes"));
// // app.use("/api/dashboard", require("./routes/DashboardRoutes"));
// // app.get("/", (req, res) => res.send("Server is running"));

// // app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const path = require("path");

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ Connect to MongoDB
// connectDB();

// // ✅ Configure CORS for both local + deployed frontend URLs
// app.use(
//   cors({
//     origin: [
//       "http://localhost:3000", // local frontend
//       "https://expense-tracker-oicsars44-rinki2400s-projects.vercel.app", // your Vercel deployment
//       "https://expense-tracker-three-flax.vercel.app", // alternate frontend URL
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"], // allow token headers
//     credentials: true,
//   })
// );

// // ✅ Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ Static folder for uploaded avatars
// app.use("/uploads/avatars", express.static(path.join(__dirname, "uploads/avatars")));

// // ✅ API Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/income", require("./routes/IncomeRoutes"));
// app.use("/api/expense", require("./routes/ExpenseRoutes"));
// app.use("/api/dashboard", require("./routes/DashboardRoutes"));

// // ✅ Root route for health check
// app.get("/", (req, res) => res.send("✅ Expense Tracker Server is running..."));

// // ✅ Start the server
// app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Configure CORS for both local and deployed frontends
app.use(
  cors({
    origin: [
      "http://localhost:3000", // local dev
      "https://expense-tracker-three-flax.vercel.app", // your Vercel frontend
      "https://expense-tracker-oicsars44-rinki2400s-projects.vercel.app", // alternate Vercel URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, // ❌ Make this false since you're using JWT in localStorage (not cookies)
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static folder for uploaded avatars
app.use("/uploads/avatars", express.static(path.join(__dirname, "uploads/avatars")));

// ✅ API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/income", require("./routes/IncomeRoutes"));
app.use("/api/expense", require("./routes/ExpenseRoutes"));
app.use("/api/dashboard", require("./routes/DashboardRoutes"));

// ✅ Root route for health check
app.get("/", (req, res) => res.send("✅ Expense Tracker Server is running..."));

// ✅ Start the server
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));

