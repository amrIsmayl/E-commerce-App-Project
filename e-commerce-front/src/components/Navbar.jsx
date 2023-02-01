import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { counterContext } from './Context/Store';

export default function Navbar(props) {
    let { price, count, incrementProduct } = useContext(counterContext)

    useEffect(() => {
        incrementProduct()
    })

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark pt-0 nav-color">
                <div className="container-fluid pt-4">
                    <Link className="navbar-brand ps-5" to="home">E-Commerce App</Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link  " aria-current="page" to="products">Products</Link>
                            </li>

                            <Dropdown as={ButtonGroup}>
                                <Dropdown.Toggle id="dropdown-custom-1" className='dropdown nav-link'>category</Dropdown.Toggle>
                                <Dropdown.Menu className=" nav-color ">
                                <Link className="nav-link text-dropdown" aria-current="page" to="electronics">Electronics</Link>
                                <Link className="nav-link text-dropdown" aria-current="page" to="fashion">Fashion</Link>
                                <Link className="nav-link text-dropdown" aria-current="page" to="shoes">Shoes</Link>
                                <Link className="nav-link text-dropdown" aria-current="page" to="furniture">Furniture</Link>
                                <Link className="nav-link text-dropdown" aria-current="page" to="skincare">Skincare</Link>
                                <Link className="nav-link text-dropdown" aria-current="page" to="decoration">Home Decoration</Link>
                                <Link className="nav-link text-dropdown" aria-current="page" to="others">Others</Link>
                                </Dropdown.Menu>
                            </Dropdown>{' '}
                        </ul>

                        <ul className="navbar-nav pe-5 mb-2 mb-lg-0">

                            {props.userData ?
                                <li className="nav-item pe-3">

                                    <Dropdown as={ButtonGroup}>
                                        <Dropdown.Toggle id="dropdown-custom-1" className='dropdown nav-link'>Account <i className="fa-solid fa-user"></i></Dropdown.Toggle>
                                        <Dropdown.Menu className=" nav-color ">
                                            <Link className="nav-link text-dropdown" aria-current="page" to="pass">Change password</Link>
                                            <Link className="nav-link text-dropdown" aria-current="page" to="address">Address</Link>
                                        </Dropdown.Menu>
                                    </Dropdown>{' '}
                                </li>
                                : ""}

                            <li className="nav-item pe-3">
                                <span className="nav-link ">$ {price}</span>
                            </li>

                            <li className="nav-item pe-5 position-relative text-light">
                                <Link className="nav-link " aria-current="page" to="cart">Cart</Link>
                                <i className="fa-solid fa-cart-shopping position-absolute cart-position "></i>
                                <span className='position-absolute number-position'>{count}</span>
                            </li>

                            {props.userData ?
                                <li className="nav-item">
                                    <Link onClick={props.logOut} className="nav-link pe-5">Logout</Link>
                                </li>
                                : <>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="login">Login</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" to="register">Register</Link>
                                    </li>

                                </>}  {/*but if not user data show this items */}

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
