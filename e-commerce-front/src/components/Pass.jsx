import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import jwtDecode from 'jwt-decode';
import bcrypt from "bcryptjs-react";

export default function Pass() {

    const [errorList, setErrorList] = useState([]); // to any error in user data in Account opration
    const [isloading, setIsloading] = useState(false); // to loading opration by default false
    const [error, setError] = useState(""); // set error variable to fail registration
    const [done, setDone] = useState(false);
    const [repass, setRepass] = useState(false); // to loading opration by default false
    const [pass, setPass] = useState(false); // to loading opration by default false
    const [user, setUser] = useState({
        password: ''
    });

    function getPassData(e) { // e = by default all information in user data whin used function
        let myPass = { ...user };
        myPass[e.target.name] = e.target.value; // to name in user data
        setUser(myPass);
    }

    async function password(e) {
        let encodedToken = localStorage.getItem('userToken'); // get token to transformation token becaose get user data
        let decodedToken = jwtDecode(encodedToken); // to transformation token becaose get user data
        let { data } = await axios.get('http://localhost:5000/user');
        let auth = data.result.filter((elm) => elm._id === decodedToken.userId)
        let success = await bcrypt.compareSync(e.target.value, auth[0].password); // true
        if (auth && success) {
            setPass(true)
        }
    }

    function repassword(e) {
        let newPass = e.target.value
        if (newPass === user.password) {
            setRepass(false)
        } else {
            setRepass(true)
        }
    }

    async function submitPassForm(e) { // e = in here because control to behavior>"solok" form tage

        e.preventDefault(); // preventDefault = this function to stop default reload action to form tage

        setIsloading(true); // to loading opration = do it true because is loading now to reception data from database

        let validationResult = validateAccountForm(); // to validate registration data

        if (!repass) {
            if (validationResult.error) {

                setErrorList(validationResult.error.details); // if error message set error in error variable

                setIsloading(false); // came again to loading opration by default false because data has been
            }
            else if (pass) {
                let tokens = localStorage.getItem("userToken");
                let { userId } = jwtDecode(tokens); // to transformation token becaose get user data
                let data = await axios.patch(`http://localhost:5000/user/changePassword/${userId}`, user);
                // in post method we need send 2 element "URL" and "new datq"
                if (data) {
                    setIsloading(false); // came again to loading opration by default false because data has been
                    setDone(true)
                }
                else {
                    setError(data.message); // set new error message in error variable when fail Account
                    setIsloading(false); // came again to loading opration by default false because data has been
                }
            }
        } else {
            setIsloading(false); // came again to loading opration by default false because data has been
        }
    }

    function validateAccountForm() {
        let scheme = Joi.object({
            password: Joi.required(),
        })
        return scheme.validate(user, { abortEarly: false });
    }

    return (
        <>
            <div className=' w-75 mx-auto pt-5'>

                {errorList.map((error, i) => i === 4 ? <div className=' alert py-2 alert-danger'>password invalid</div> : <div className=' alert py-2 alert-danger'>{error.message}</div>)}
                {/*this step to show error when false validate data*/}
                {/*number "4" : change form message error to password because not show patern validate*/}

                {error ? <div className=' alert alert-danger'>{error}</div> : ''}
                {/*this step to if error in respons then show error in new dev */}

                <form onSubmit={submitPassForm}>
                    <h2 className=' my-2 mt-5'>Update your password :</h2>

                    {pass ? <h4 className=' float-end alert py-1 mb-2 alert-success w-50 text-center'>Correct password</h4> : ""}
                    <label htmlFor="password" className=' my-2 '>Password :</label>
                    <input onChange={password} type='password' className=' form-control mb-2' id='password' name='password' />

                    <label htmlFor="password" className=' my-2 '>New Password :</label>
                    <input onChange={getPassData} type='password' className=' form-control mb-2' id='NewPassword' name='password' />

                    <label className=' my-2 '>Repassword :</label>
                    <input onChange={repassword} type='password' className=' form-control mb-2' />

                    <div className=' d-flex justify-content-between mt-4'>
                        <button type='supmit' className=' btn btn-outline-info px-3 '>
                            {isloading ? <i className=' fas fa-spinner fa-spin'></i> : "done"}
                            {/*create spinner to wait loading opration but if not loading opration show "Account" */}
                        </button>
                        {repass ? <h4 className=' alert py-1 my-0 alert-danger w-50 text-center'>Password does not match</h4> : ""}
                        {done ? <h4 className=' alert py-1 my-0 alert-success w-75 text-center'>Password has been changed</h4> : ""}
                    </div>

                </form>

            </div>


        </>
    )
}
