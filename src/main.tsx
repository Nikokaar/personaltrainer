// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import CustomerList from './CustomerList'
import TrainingList from './TrainingList'
import './index.css'

// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-material.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="CustomerList" element={<CustomerList />} />
          <Route path="TrainingList" element={<TrainingList />} />
          {/* Optionaalinen etusivu */}
          <Route index element={<CustomerList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
