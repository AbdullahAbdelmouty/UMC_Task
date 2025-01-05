const sql = require('mssql');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        const connection = req.app.get('connection');
        if (!connection) {
            throw new Error('Database connection settings are missing.');
        }
        const pool = await sql.connect(connection);
        const { Username, Password ,Role} = req.body;

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        // Validate input data
        if (!Username) return res.status(400).json({ message: "Username is required" });
        if (!Password) return res.status(400).json({ message: "Password is required" });
        if (!Role) return res.status(400).json({ message: "Role is required" });

        // check if username already exists
        const usernameExists = await pool.request()
            .input('Username', sql.NVarChar, Username)
            .query('SELECT * FROM Users WHERE Username = @Username');
        if (usernameExists.recordset.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // admin who can create user
        // const { Role:roleUser } = req.user;
        // if (roleUser !== 'admin') {
        //     return res.status(400).json({ message: "You are not authorized to create user" });
        // }

        const result = await pool.request()
            .input('Username', sql.NVarChar, Username)
            .input('Password', sql.NVarChar, hashedPassword)
            .input('Role', sql.NVarChar, Role)
            .query('INSERT INTO Users (Username, Password, Role) VALUES (@Username, @Password, @Role)');
        
        res.json({ message: "Employee created successfully", result })
    } catch (error) {
        res.status(500).json(error);
    }
}

const getUsers = async (req, res) => {
    try {
        const connection = req.app.get('connection');
        if (!connection) {
            throw new Error('Database connection settings are missing.');
        }
        const pool = await sql.connect(connection);
        const result = await pool.request().query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getUser = async (req, res) => {
    try {
        const pool = await sql.connect(req.app.get('connection'));
        const { id } = req.params;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .execute('spGetUser');
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const pool = await sql.connect(req.app.get('connection'));
        const { id } = req.params;
        const { name, email, password } = req.body;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar, name)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .execute('spUpdateUser');
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteUser = async (req, res) => {
    try {
        const pool = await sql.connect(req.app.get('connection'));
        const { id } = req.params;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .execute('spDeleteUser');
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };