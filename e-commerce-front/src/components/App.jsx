import './App.css';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import NotFound from './NotFound';
import Navbar from './Navbar';
import Cart from './Cart';
import Products from './Products';
import Electronics from './Electronics';
import Fashion from './Fashion';
import Shoes from './Shoes';
import Furniture from './Furniture';
import Skincare from './Skincare';
import Decoration from './Decoration';
import Others from './Others';
import Address from './Address';
import Pass from './Pass';

import { Navigate, Route, Routes } from 'react-router-dom';
import jwtDecode from 'jwt-decode'; // jwtDecode : to Transformation token to object Contain all data to user 
import { useEffect, useState } from 'react';
import CounterContextProvider from './Context/Store';


function App() {

  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken'); // get token to transformation token becaose get user data
    let decodedToken = jwtDecode(encodedToken); // to transformation token becaose get user data
    setUserData(decodedToken); // set user data in object becaose using 
  }

  function logOut() {
    setUserData(null);
    localStorage.removeItem('userToken');
  }

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      saveUserData();
    }
  }, [])

  function ProtectedRoute(props) {
    if (localStorage.getItem('userToken') === null) {
      return <Navigate to='/Login' />
    }
    // else {
    //   return props.children;
    // }
  };

  const addItem = (data) => {
    let start = []
    let product = JSON.parse(localStorage.getItem("products"))
    if (product) {
      let exist = product.find((elm) => elm.id === data.id)
      if (exist) {
        let cart = product.map((elm) => elm.id === data.id ? { ...exist, qty: exist.qty + 1 } : elm)
        localStorage.setItem("products", JSON.stringify(cart))
      } else {
        product.push({ ...data, qty: 1 });
        localStorage.setItem("products", JSON.stringify(product))
      }
    } else {
      start.push({ ...data, qty: 1 });
      localStorage.setItem("products", JSON.stringify(start))
    }
  }

  function deleteItem(data) {
    let product = JSON.parse(localStorage.getItem("products"))
    if (product) {
      let exist = product.find((elm) => elm.id === data.id)
      if (exist && data.qty >= 2) {
        let cart = product.map((elm) => elm.id === data.id ? { ...exist, qty: exist.qty - 1 } : elm)
        localStorage.setItem("products", JSON.stringify(cart))
      } else if (data.qty < 2) {
        let cart = product.filter((elm) => elm.id !== data.id)
        localStorage.setItem("products", JSON.stringify(cart))
      }
    }
  }

  return (
    <>
      <CounterContextProvider>
        <Navbar logOut={logOut} userData={userData} />

        <div className=" container">
          <Routes>

            <Route path="" element={<Home />} />
            <Route path="home" element={<Home addItem={addItem} />} />
            <Route path="cart" element={<Cart addItem={addItem} deleteItem={deleteItem} />} />
            <Route path="products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="electronics" element={<Electronics addItem={addItem} />} />
            <Route path="fashion" element={<Fashion addItem={addItem} />} />
            <Route path="shoes" element={<Shoes addItem={addItem} />} />
            <Route path="furniture" element={<Furniture addItem={addItem} />} />
            <Route path="skincare" element={<Skincare addItem={addItem} />} />
            <Route path="decoration" element={<Decoration addItem={addItem} />} />
            <Route path="others" element={<Others addItem={addItem} />} />
            <Route path="address" element={<ProtectedRoute><Address /></ProtectedRoute>} />
            <Route path="pass" element={<ProtectedRoute><Pass /></ProtectedRoute>} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login saveUserData={saveUserData} />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
      </CounterContextProvider>

    </>
  );
}

export default App;
