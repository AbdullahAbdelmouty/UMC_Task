import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './Contexts/AuthContext';
import { EmployeeContextProvider } from './Contexts/EmployeeContext';
import { UserContextProvider } from './Contexts/UserContext';
import { DepartmentContextProvider } from './Contexts/DepartmentContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <EmployeeContextProvider>
        <UserContextProvider>
          <DepartmentContextProvider> 
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </DepartmentContextProvider>
        </UserContextProvider>
      </EmployeeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
