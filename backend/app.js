require('dotenv').config();
const express = require('express');
const app = express();
const cookiesParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const employeeRoutes = require('./Routes/Employee');
const userRoutes = require('./Routes/Users');
const departmentRoutes = require('./Routes/Department');
const authRoutes = require('./Routes/Auth');

// DB Configuration
const config = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,  // enable encryption
        trustServerCertificate: true  // disable SSL certificate validation
    }
};
// Middleware
app.set('connection', config);
// cors for cross-origin requests
const corsOptions = {
    origin: [`${process.env.FRONT_END_URL}`,`${process.env.DASHBOARD_URL}`],
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookiesParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());

// Routes
app.use('/api/v1/employee', employeeRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/department', departmentRoutes);
app.use('/api/v1/auth', authRoutes);
app.get('/api/v1/', (req, res) => {
    res.send('Welcome to the API');
});

// Connect to the database
sql.connect(config, (err) => {
    if (err) console.log(err);
    else console.log('Connected to the database');
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});