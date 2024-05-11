// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import EmployeeForm from './pages/Employee/Employee';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/employee" element={<EmployeeForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
