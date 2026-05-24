import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Component/Home'
import Login from './Component/Login'
import PageNotFound from './Component/PageNotFound'
import ProtectedRoute from './Component/ProtectedRoute'
import Landing from './Component/Landing'


function App() {

  return (
    
    <Routes>
      <Route path='/' element={<Landing></Landing>}></Route>

      <Route path="/login" element={<Login></Login>}></Route>

      <Route path="/chats" element={<ProtectedRoute>
        <Home></Home>
      </ProtectedRoute>}></Route>

      <Route path="chats/:chatId" element={<ProtectedRoute>
        <Home></Home>
      </ProtectedRoute>}></Route>

      <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      
    </Routes>

  )
}

export default App
