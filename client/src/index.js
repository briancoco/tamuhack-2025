import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import App from './App';
import {Theme} from "@radix-ui/themes"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Theme>
    <Routes>
      <Route path="/*" element={<App />}/>
    </Routes>
  </Theme>
    
  </BrowserRouter>
);
