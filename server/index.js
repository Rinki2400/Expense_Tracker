const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const connectDB = require('./config/db');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads/avatars", express.static("uploads/avatars"));

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/income', require('./routes/IncomeRoutes'))
app.use('/api/expense', require('./routes/ExpenseRoutes'))
app.use('/api/dashboard', require('./routes/DashboardRoutes'))
app.get('/', (req, res) => res.send('Server is running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

