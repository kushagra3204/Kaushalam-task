import './App.css';
import Navbar from './components/Navbar';
import Landing from './pages/landingPage';
import Signup from './pages/SignupPage';
import Login from './pages/LoginPage';
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/landing' element={<>
          <Navbar />
          <Landing />
        </>} />
      </Routes>
    </>
  )
}

export default App;
