import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import JobList from './components/JobList';
import WarehouseList from './components/WarehouseList';
import ChemicalList from './components/ChemicalList';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/warehouses">Warehouses</Link>
            </li>
            <li>
              <Link to="/chemicals">Chemicals</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/jobs" element={<JobList />} />
          <Route path="/warehouses" element={<WarehouseList />} />
          <Route path="/chemicals" element={<ChemicalList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

