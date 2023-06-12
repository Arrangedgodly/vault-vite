import Header from './components/Header'
import ChangeCounter from './components/ChangeCounter'
import Login from './components/Login'
import Stores from './components/Stores'
import Store from './components/Store'
import User from './components/User'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth, provider } from './firebase'
import { signInWithPopup, signOut } from 'firebase/auth'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null)
  const [err, setErr] = useState<any>(null)

  const navigate = useNavigate()

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setLoggedIn(true);
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        setErr({ errorCode, errorMessage, email })
      });
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      setLoggedIn(false)
      setUser(null)
      localStorage.removeItem('user')
    }).catch((error) => {
      console.log(error)
    }
    )
  }

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center min-h-screen p-0">
      <Header loggedIn={loggedIn} user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<ChangeCounter />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} err={err} setErr={setErr} />} />
        <Route
          path="/stores"
          element={<Stores loggedIn={loggedIn} user={user} />}
        />
        <Route
          path="/stores/:store"
          element={<Store />}
        />
        <Route
          path="/my-account"
          element={<User loggedIn={loggedIn} user={user} />}
        />
      </Routes>
    </div>
  );
}

export default App
