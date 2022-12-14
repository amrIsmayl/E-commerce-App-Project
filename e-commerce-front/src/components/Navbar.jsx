import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function Navbar(props) {


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
                <div className="container-fluid pt-4">
                    <Link className="navbar-brand ps-5" to="home">Club Wealth</Link>

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
                                <Dropdown.Menu className=" bg-dark ">
                                    <Dropdown.Item eventKey="1" className="nav-link ">
                                    <Link className="nav-link text-dropdown" aria-current="page" to="electronics">Electronics</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="1" className="nav-link ">
                                    <Link className="nav-link text-dropdown" aria-current="page" to="fashion">Fashion</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="1" className="nav-link ">
                                    <Link className="nav-link text-dropdown" aria-current="page" to="shoes">Shoes</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="1" className="nav-link ">
                                    <Link className="nav-link text-dropdown" aria-current="page" to="furniture">Furniture</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="1" className="nav-link ">
                                    <Link className="nav-link text-dropdown" aria-current="page" to="skincare">Skincare</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="1" className="nav-link ">
                                    <Link className="nav-link text-dropdown" aria-current="page" to="decoration">Home Decoration</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="1" className="nav-link ">
                                    <Link className="nav-link text-dropdown" aria-current="page" to="others">Others</Link>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>{' '}
                            <Dropdown as={ButtonGroup}></Dropdown>

                        </ul>

                        <ul className="navbar-nav pe-5 mb-2 mb-lg-0">

                            <li className="nav-item pe-3">
                                <Link className="nav-link " aria-current="page" to="cart"><i className="fa-solid fa-user"></i></Link>
                            </li>


                            <li className="nav-item pe-5 position-relative text-light">
                                <Link className="nav-link " aria-current="page" to="cart">Cart</Link>
                                <i className="fa-solid fa-cart-shopping position-absolute cart-position"></i>
                                <span className='position-absolute number-position'>0</span>
                            </li>

                            {props.userData ?
                                <li className="nav-item">
                                    <span onClick={props.logOut} className="nav-link pe-5 pointer">Logout</span>
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
