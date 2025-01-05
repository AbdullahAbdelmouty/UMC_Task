CREATE DATABASE UMC;
USE UMC;

-- Create Departments Table
CREATE TABLE Departments (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);

-- Create Employees Table
CREATE TABLE Employees (
    Id INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    DepartmentId INT NOT NULL,
    HireDate DATE NOT NULL,
    Salary DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (DepartmentId) REFERENCES Departments(Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Create Users Table
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    Role NVARCHAR(50) NOT NULL
);

-- Insert mock data into Departments table
INSERT INTO Departments (Name) VALUES
('Human Resources'),
('Finance'),
('Engineering'),
('Marketing'),
('Sales');

-- Insert mock data into Employees table
INSERT INTO Employees (FirstName, LastName, Email, DepartmentId, HireDate, Salary) VALUES
('John', 'Doe', 'john.doe@example.com', 1, '2020-06-15', 50000.00),
('Jane', 'Smith', 'jane.smith@example.com', 2, '2019-03-22', 65000.00),
('Michael', 'Johnson', 'michael.johnson@example.com', 3, '2021-01-10', 80000.00),
('Emily', 'Davis', 'emily.davis@example.com', 4, '2018-11-05', 55000.00),
('William', 'Brown', 'william.brown@example.com', 5, '2022-07-12', 45000.00);

-- Insert mock data into Users table
INSERT INTO Users (Username, Password, Role) VALUES
('admin', 'admin123', 'Administrator'),
('hrmanager', 'hrmanager123', 'HR Manager'),
('financemgr', 'financemgr123', 'Finance Manager'),
('englead', 'englead123', 'Engineering Lead'),
('salesrep', 'salesrep123', 'Sales Representative');