import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Books from './components/Books'
import Navigations from './components/Navigations'
import Register from './components/Register'
import Login from './components/Login'
import Account from './components/Account'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <Navigations />
      <Routes>
        <Route path='/' element={<div>Hello</div>} />
        <Route path='/books' element={<Books />} />
        <Route path='/register' element={<Register setToken={setToken} />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/account' element={<Account token={token} />} />
      </Routes>
    </>
  )
}

export default App