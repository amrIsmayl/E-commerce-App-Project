import axios from 'axios';
import Joi from 'joi';
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react'

export default function Pass(props) {

    const [errorList, setErrorList] = useState([]); // to any error in user data in Account opration
    const [isloading, setIsloading] = useState(false); // to loading opration by default false
    const [error, setError] = useState(""); // set error variable to fail registration

    const [user, setUser] = useState("");

    function getPassData(e) { // e = by default all information in user data whin used function
        // let myUser = ; // deep copy user 
        // myUser[e.target.Password] = e.target.value; // to name in user data
        setUser(e.target.value);
    }

    async function submitPassForm(e) { // e = in here because control to behavior>"solok" form tage

        e.preventDefault(); // preventDefault = this function to stop default reload action to form tage

        setIsloading(true); // to loading opration = do it true because is loading now to reception data from database

        let validationResult = validateAccountForm(); // to validate registration data

        if (validationResult.error) {

            setErrorList(validationResult.error.details); // if error message set error in error variable

            setIsloading(false); // came again to loading opration by default false because data has been
        }
        else {
            let encodedToken = localStorage.getItem('userToken'); // get token to transformation token becaose get user data
            let { userId } = jwtDecode(encodedToken); // to transformation token becaose get user data
            console.log(userId);
            let data = await axios.put(`http://localhost:5000/user/${userId}`, user);
            console.log(data);

            // in post method we need send 2 element "URL" and "new datq"

            if (data) {
                setIsloading(false); // came again to loading opration by default false because data has been

                localStorage.setItem('userToken', data.token); // when login is successful set user token in localStorage in variable userToken

                props.saveUserData(); // this function in app.jsx , it transformation token to object all user data 
                // props : to send data between components 
            }
            else {
                setError(data.message); // set new error message in error variable when fail Account

                setIsloading(false); // came again to loading opration by default false because data has been
            }
        }
    }

    function validateAccountForm() {
        let scheme = Joi.object({
            password: Joi.string(),
        })
        return scheme.validate(user, { abortEarly: false });
    }


    return (
        <>
            <div className=' w-75 mx-auto pt-5'>
                <h2 className=' mb-4'>Add your address</h2>

                {errorList.map((error, i) => i === 4 ? <div className=' alert py-2 alert-danger'>password invalid</div> : <div className=' alert py-2 alert-danger'>{error.message}</div>)}
                {/*this step to show error when false validate data*/}
                {/*number "4" : change form message error to password because not show patern validate*/}

                {error ? <div className=' alert alert-danger'>{error}</div> : ''}
                {/*this step to if error in respons then show error in new dev */}



                <form onSubmit={submitPassForm}>
                    <h2 className=' my-2 mt-5'>Update your password :</h2>

                    <label htmlFor="Password" className=' my-2 '>password :</label>
                    <input onChange={getPassData} type='password' className=' form-control mb-2' id='Password' name='Password' />

                    <button type='supmit' className=' btn btn-outline-info mt-4'>
                        {isloading ? <i className=' fas fa-spinner fa-spin'></i> : "done"}
                        {/*create spinner to wait loading opration but if not loading opration show "Account" */}
                    </button>

                </form>

            </div>


        </>
    )
}
