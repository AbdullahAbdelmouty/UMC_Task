const sql = require('mssql');

const getDepartments = async (req, res) => {
    try {
        // Retrieve database connection settings from the app
        const connection = req.app.get('connection');
        if (!connection) {
            throw new Error('Database connection settings are missing.');
        }
        // Establish a connection to the database
        const pool = await sql.connect(connection);
        // Execute the query to retrieve all departments
        const result = await pool.request().query('SELECT * FROM Departments');
        res.json({ departments: result.recordset ,count: result.recordset.length});
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send(error.message);
    }
}

const getDepartment = async (req, res) => {
    try {
        const connection = req.app.get('connection');
        if (!connection) {
            throw new Error('Database connection settings are missing.');
        }
        const pool = await sql.connect(connection);
        const { id } = req.params;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Departments WHERE id = @id');
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const createDepartment = async (req, res) => {
    try {
        // Validate the request body
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'The name field is required.' });
        }

        // Retrieve database connection settings from the app
        const connection = req.app.get('connection');
        if (!connection) {
            throw new Error('Database connection settings are missing.');
        }

        // Establish a connection to the database
        const pool = await sql.connect(connection);

        // Check if a department with the same name already exists
        const existingDepartment = await pool.request()
            .input('name', sql.NVarChar, name)
            .query('SELECT * FROM Departments WHERE Name = @name');
        if (existingDepartment.recordset.length > 0) {
            return res.status(400).json({ message: 'A department with the same name already exists.' });
        }

        // Execute the query to insert the department
        const result = await pool.request()
            .input('name', sql.NVarChar, name)
            .query('INSERT INTO Departments (Name) VALUES (@name); SELECT SCOPE_IDENTITY() AS DepartmentId;');

        // Retrieve the inserted department ID
        const departmentId = result.recordset[0]?.DepartmentId;

        // Send a success response
        res.status(201).json({
            message: 'Department created successfully.',
            departmentId: departmentId,
        });
    } catch (error) {
        // Log the error and send an appropriate response
        console.error('Error creating department:', error.message);
        res.status(500).json({ message: 'Failed to create department.', error: error.message });
    }
};


const updateDepartment = async (req, res) => {
    try {
        // Retrieve database connection settings from the app
        const connection = req.app.get('connection');
        if (!connection) {
            throw new Error('Database connection settings are missing.');
        }

        // Extract the department ID from request parameters and the updates from the request body
        const { id } = req.params;
        const { name } = req.body;

        // Validate the inputs
        if (!id) {
            return res.status(400).json({ message: 'The department ID is required.' });
        }
        if (!name) {
            return res.status(400).json({ message: 'The name field is required.' });
        }
        
        // Connect to the database
        const pool = await sql.connect(connection);
        // Check if a department with the same name already exists
        const existingDepartment = await pool.request()
            .input('name', sql.NVarChar, name)
            .query('SELECT * FROM Departments WHERE Name = @name');
        if (existingDepartment.recordset.length > 0) {
            return res.status(400).json({ message: 'A department with the same name already exists.' });
        }
        // Execute the update query
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar, name)
            .query('UPDATE Departments SET Name = @name WHERE Id = @id');

        // Check if any row was affected (meaning the update was successful)
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Department not found or no changes made.' });
        }

        // Respond with success
        res.json({ message: 'Department updated successfully.' });
    } catch (error) {
        // Log the error and send an appropriate response
        console.error('Error updating department:', error.message);
        res.status(500).json({ message: 'Failed to update department.', error: error.message });
    }
};


const deleteDepartment = async (req, res) => {
    try {
        const connection = req.app.get('connection');
        if (!connection) {
            throw new Error('Database connection settings are missing.');
        }
        const pool = await sql.connect(connection);
        const { id } = req.params;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Departments WHERE id = @id');
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment };