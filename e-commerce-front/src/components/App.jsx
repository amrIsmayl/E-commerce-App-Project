import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import NotFound from './NotFound';
import Navbar from './Navbar';
import Cart from './Cart';
import Products from './Products';

import jwtDecode from 'jwt-decode'; // jwtDecode : to Transformation token to object Contain all data to user 
import { useEffect, useState } from 'react';
import Electronics from './Electronics';
import Fashion from './Fashion';
import Shoes from './Shoes';
import Furniture from './Furniture';
import Skincare from './Skincare';
import Decoration from './Decoration';
import Others from './Others';

function App() {
  
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate;

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken'); // get token to transformation token becaose get user data
    let decodedToken = jwtDecode(encodedToken); // to transformation token becaose get user data
    setUserData(decodedToken); // set user data in object becaose using 
  }

  function logOut() {
    setUserData(null);
    localStorage.removeItem('userToken');
    navigate('/Login');
  }

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveUserData();
    }
  },[])

  function ProtectedRoute(props) {
    if (localStorage.getItem('userToken') === null) {
      return <Navigate to='/Login' />
    }
    else {
      return props.children;
    }
  };

  return (
    <>
      <Navbar logOut={logOut} userData={userData} />

      <div className=" container">
        <Routes>

          <Route path="" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="electronics" element={<ProtectedRoute><Electronics /></ProtectedRoute>} />
          <Route path="fashion" element={<ProtectedRoute><Fashion /></ProtectedRoute>} />
          <Route path="shoes" element={<ProtectedRoute><Shoes /></ProtectedRoute>} />
          <Route path="furniture" element={<ProtectedRoute><Furniture /></ProtectedRoute>} />
          <Route path="skincare" element={<ProtectedRoute><Skincare /></ProtectedRoute>} />
          <Route path="decoration" element={<ProtectedRoute><Decoration /></ProtectedRoute>} />
          <Route path="others" element={<ProtectedRoute><Others /></ProtectedRoute>} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login saveUserData={saveUserData} />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
