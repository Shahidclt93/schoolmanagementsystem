import React from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import MainRouter from './routes/Routes'


function App() {
  return <RouterProvider router={MainRouter} />


  
}

export default App
