import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Chat from './pages/Chat'
import SignIn from './pages/SignIn'
import axios from 'axios'

export default function App() {
  axios.defaults.baseURL = 'http://localhost:3000'||'https://chat-app-server-7su1.onrender.com';
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
}
