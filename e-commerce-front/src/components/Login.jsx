import axios from 'axios';
import Joi from 'joi';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { counterContext } from './Context/Store';
// useNavigate : hook in react-router-dom to create navigation automatic
// by aleb been el pages with automatic 
// we using when registration success, Move to next page

export default function Login(props) {

    const [errorList, setErrorList] = useState([]); // to any error in user data in register opration
    const [isloading, setIsloading] = useState(false); // to loading opration by default false
    const [error, setError] = useState(""); // set error variable to fail registration
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    let { incrementProduct } = useContext(counterContext);

    let navigate = useNavigate(); // create variable to useNavigate because using after soon

    function getUserData(e) { // e = by default all information in user data whin used function
        let myUser = { ...user }; // deep copy user 
        myUser[e.target.name] = e.target.value; // to name in user data
        setUser(myUser);
    }

    async function submitLoginForm(e) { // e = in here because control to behavior>"solok" form tage

        e.preventDefault(); // preventDefault = this function to stop default reload action to form tage

        setIsloading(true); // to loading opration = do it true because is loading now to reception data from database

        let validationResult = validateLoginForm(); // to validate registration data

        if (validationResult.error) {

            setErrorList(validationResult.error.details); // if error message set error in error variable

            setIsloading(false); // came again to loading opration by default false because data has been
        }
        else {
            let { data } = await axios.post('http://localhost:5000/user/signin', user);
            // in post method we need send 2 element "URL" and "new datq"
            if (data) {
                setIsloading(false); // came again to loading opration by default false because data has been
                localStorage.setItem('userToken', data.token); // when login is successful set user token in localStorage in variable userToken
                props.saveUserData(); // this function in app.jsx , it transformation token to object all user data 
                // props : to send data between components
                incrementProduct()
                navigate('/home') // the variable navigate giving name the next page 
            }
            else {
                setError(data.message); // set new error message in error variable when fail register
                setIsloading(false); // came again to loading opration by default false because data has been
            }
        }
    }

    function validateLoginForm() {
        let scheme = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().required(),
        })
        return scheme.validate(user, { abortEarly: false });
        // abortEarly = to show all error messages in error variable
        // in default "abortEarly: true" but we change it to "abortEarly: false"
        // user = to validate on user data
    }

    return (
        <>
            <div className=' py-5'>
                <div className=' w-75 mx-auto my-5 pt-5'>
                    <h2 className=' mb-4'>Login Now</h2>

                    {errorList.map((error, i) => i === 1 ? <div className=' alert py-2 alert-danger'>password invalid</div> : <div className=' alert py-2 alert-danger'>{error.message}</div>)}
                    {/*this step to show error when false validate data*/}
                    {/*number "1" : change form message error to password because not show patern validate*/}

                    {error ? <div className=' alert alert-danger'>{error}</div> : ''}
                    {/*this step to if error in respons then show error in new dev */}

                    <form onSubmit={submitLoginForm}>
                        {/*onSubmit = onClick in button tage but we used this attribute because whin click enter in keybord*/}

                        <label htmlFor="email" className=' my-2'>email :</label>
                        <input onChange={getUserData} type='email' className=' form-control mb-2' id='email' name='email' />

                        <label htmlFor="password" className=' my-2'>password :</label>
                        <input onChange={getUserData} type='password' className=' form-control mb-2' id='password' name='password' />

                        <button type='supmit' className=' btn btn-outline-info mt-4'>
                            {isloading ? <i className=' fas fa-spinner fa-spin'></i> : "Login"}
                            {/*create spinner to wait loading opration but if not loading opration show "Register" */}
                        </button>

                    </form>

                </div>
            </div>
        </>
    )
}
