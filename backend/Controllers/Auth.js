const sql = require('mssql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const signUp = async (req, res) => {
    const { username, password  } = req.body;
    try {
        const connection = req.app.get('connection');
        if (!connection) {
            throw new Error('Database connection settings are missing.');
        }
        const pool = await sql.connect(connection);
        const hash = bcrypt.hashSync(password, 10);
        // add role admin to the first user
        const Role = "admin";
        const query = `INSERT INTO Users (username, password, role) VALUES ('${username}', '${hash}', '${Role}')`;
        const result = await pool.request().query(query);
        // create token
        const token = jwt.sign({ username, }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        console.log(token,"token");
        
        // attach token to cookies
        const oneDay = 1000*60*60*24
        res.cookie('token',
        token,
        {
        httpOnly: true,
        expires:new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        sameSite: "none",
        signed: true, // 
        })
        res.status(201).send('User created successfully');

    } catch (error) {
        res.status(500).send(error);
    }
}

const signIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const connection = req.app.get('connection');
        if (!connection) {
            throw new Error('Database connection settings are missing.');
        }
        const pool = await sql.connect(connection);
        const query = `SELECT * FROM Users WHERE username = '${username}'`;
        const result = await pool.request().query(query);
        if (result.recordset.length === 0) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        const user = result.recordset[0];
        console.log(user,"user");
        
        const isPasswordValid = bcrypt.compareSync(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }
        const Role = user.Role;
        // create token
        const token = jwt.sign({ username,Role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        // attach token to cookies
        const oneDay = 1000*60*60*24
        res.cookie('token',
        token,
        {
        httpOnly: false,
        expires:new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        sameSite: "none",
        signed: true, // 
        })
        console.log(res.cookie,"res.cookie");
        
        res.status(200).send({username,Role ,token });
    } catch (error) {
        res.status(500).send({ error });
    }
}
// show current user
const showMe = async (req, res) => {
    console.log(req.username,"req.user");
    
    res.status(200).json({user: req.username});
}
const signOut = async (req, res) => {
    res.status(200).send('User signed out');
}

module.exports = { signUp, signIn, signOut ,showMe};