import Header from './components/Header'
import ChangeCounter from './components/ChangeCounter'
import Login from './components/Login'
import Stores from './components/Stores'
import Store from './components/Store'
import User from './components/User'
import { Routes, Route } from 'react-router-dom'
import { useAppLogic } from './logic/useAppLogic'

function App() {
  const { loggedIn, user, err, handleLogin, handleLogout, primaryStore } = useAppLogic();

  return (
    <div className="flex flex-col items-center min-h-screen p-0">
      <Header loggedIn={loggedIn} user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<ChangeCounter user={user} />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} err={err} />} />
        <Route
          path="/stores"
          element={<Stores user={user} />}
        />
        <Route
          path="/stores/:store"
          element={<Store />}
        />
        <Route
          path="/my-account"
          element={<User user={user} />}
        />
      </Routes>
    </div>
  );
}

export default App
