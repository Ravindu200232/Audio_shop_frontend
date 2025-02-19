import './App.css'
import AdminPage from './pages/admin/adminPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/homePage';
import Testing from './components/testing';
import Login from './pages/login/login';
import toast, { Toaster } from 'react-hot-toast';
import Register from './pages/register/register';

function App() {
  

  return (
    <BrowserRouter>
    <Toaster position='top-right'/>
    <Routes path="/">
    <Route path="/testing" element={<Testing/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path="admin/*" element={<AdminPage/>}/>
    <Route path="/*" element={<HomePage/>}/>
    <Route path='/register/*' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
 
  )
}

export default App
