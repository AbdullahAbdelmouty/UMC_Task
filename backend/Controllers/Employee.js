const sql = require('mssql');

const getEmployees = async (req, res) => {
    try {
        const connection = req.app.get('connection');
        if (!connection) {
            throw new Error('Database connection settings are missing.');
        }
        const pool = await sql.connect(connection);
        const result = await pool.request().query('SELECT * FROM Employees');
        res.json({employees:result.recordset, count: result.recordset.length});
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

const getEmployee = async (req, res) => {
    try {
        const connection = req.app.get('connection');
        if (!connection) {
            throw new Error('Database connection settings are missing.');
        }
        const pool = await sql.connect(connection);
        const { id } = req.params;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Employees WHERE id = @id');
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

const createEmployee = async (req, res) => {
    try {
        const pool = await sql.connect(req.app.get('connection'));
        
        // Destructure the values from the request body
        const { firstName, lastName, email, departmentId, hireDate, salary } = req.body;

        // Validate input data
        if(!firstName) return res.status(400).json({ message: "First name is required" });
        if(!lastName) return res.status(400).json({ message: "Last name is required" });
        if(!email) return res.status(400).json({ message: "Email is required" });
        if(!departmentId) return res.status(400).json({ message: "Department ID is required" });
        if(!hireDate) return res.status(400).json({ message: "Hire date is required" });
        if(!salary) return res.status(400).json({ message: "Salary is required" });
        
        // check if email already exists
        const emailExists = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Employees WHERE Email = @email');
        if (emailExists.recordset.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }
        
        // Prepare the query
        const result = await pool.request()
            .input('firstName', sql.NVarChar, firstName)
            .input('lastName', sql.NVarChar, lastName)
            .input('email', sql.NVarChar, email)
            .input('departmentId', sql.Int, departmentId)
            .input('hireDate', sql.Date, hireDate)
            .input('salary', sql.Decimal, salary)
            .query(`
                INSERT INTO Employees (FirstName, LastName, Email, DepartmentId, HireDate, Salary)
                VALUES (@firstName, @lastName, @email, @departmentId, @hireDate, @salary)
            `);
        
        res.json({ message: "Employee created successfully", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating employee", error });
    }
};


const updateEmployee = async (req, res) => {
    try {
        const pool = await sql.connect(req.app.get('connection'));
        const { id } = req.params;
        // Destructure the values from the request body
        const {FirstName: firstName, LastName: lastName, Email: email, DepartmentId: departmentId, HireDate: hireDate, Salary: salary } = req.body;
        
        // get the employee details
        const employee = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Employees WHERE Id = @id');

        // Check if the employee exists
        if (employee.recordset.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }
        // Destructure the employee details
        const {FirstName: firstNameDB, LastName: lastNameDB, Email: emailDB, DepartmentId: departmentIdDB, HireDate: hireDateDB, Salary: salaryDB } = employee.recordset[0];

        // cannot update the email if it already exists
        if (email && email !== currentEmail) {
            const emailExists = await pool.request()
                .input('email', sql.NVarChar, email)
                .query('SELECT * FROM Employees WHERE Email = @email');
            if (emailExists.recordset.length > 0) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }

        // Use the existing values if the new values are not provided
        const newFirstName = firstName || firstNameDB;
        const newLastName = lastName || lastNameDB;
        const newEmail = email || emailDB;
        const newDepartmentId = departmentId || departmentIdDB;
        const newHireDate = hireDate || hireDateDB;
        const newSalary = salary || salaryDB;
        
        // Prepare the query to update the employee details
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('firstName', sql.NVarChar, newFirstName)
            .input('lastName', sql.NVarChar, newLastName)
            .input('email', sql.NVarChar, newEmail)
            .input('departmentId', sql.Int, newDepartmentId)
            .input('hireDate', sql.Date, newHireDate)
            .input('salary', sql.Decimal, newSalary)
            .query(`
                UPDATE Employees
                SET FirstName = @firstName,
                    LastName = @lastName,
                    Email = @email,
                    DepartmentId = @departmentId,
                    HireDate = @hireDate,
                    Salary = @salary
                WHERE Id = @id
            `);

        res.json({ message: "Employee updated successfully", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating employee", error });
    }
};


const deleteEmployee = async (req, res) => {
    try {
        const pool = await sql.connect(req.app.get('connection'));
        const { id } = req.params;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Employees WHERE id = @id');
        res.json(result);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
}

module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee };