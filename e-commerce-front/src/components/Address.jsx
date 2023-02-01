import axios from 'axios';
import Joi from 'joi';
// import jwtDecode from 'jwt-decode';
import React, { useState } from 'react'

export default function Address() {
    const [errorList, setErrorList] = useState([]); // to any error in user data in Account opration
    const [isloading, setIsloading] = useState(false); // to loading opration by default false
    const [added, setAdded] = useState(false); // to loading opration by default false
    const [error, setError] = useState(""); // set error variable to fail registration

    const [address, setAddress] = useState({
        name: "",
        street: "",
        city: "",
        phone: ""
    });

    function getUserData(e) { // e = by default all information in user data whin used function
        let myAddress = { ...address };
        myAddress[e.target.name] = e.target.value; // to name in user data
        setAddress(myAddress);
    }

    async function submitAddressForm(e) { // e = in here because control to behavior>"solok" form tage

        e.preventDefault(); // preventDefault = this function to stop default reload action to form tage

        setIsloading(true); // to loading opration = do it true because is loading now to reception data from database

        let validationResult = validateAccountForm(); // to validate registration data

        if (validationResult.error) {

            setErrorList(validationResult.error.details); // if error message set error in error variable

            setIsloading(false); // came again to loading opration by default false because data has been
        }
        else {

            let tokens = localStorage.getItem("userToken");
            let data = await axios.patch("http://localhost:5000/address", address, { headers: { "token": tokens } });
            // headers : to send data in header when send data to backend code, like header in postman 
            // in post method we need send 2 element "URL" and "new data"
            setIsloading(false); // came again to loading opration by default false because data has been
            setAdded(true)
            if (data) {
                setIsloading(false); // came again to loading opration by default false because data has been
            }
            else {
                setError(data.message); // set new error message in error variable when fail Account
                setIsloading(false); // came again to loading opration by default false because data has been
            }
        }
    }

    function validateAccountForm() {
        let scheme = Joi.object({
            name: Joi.string(),
            street: Joi.string(),
            city: Joi.string(),
            phone: Joi.string(),
        })

        return scheme.validate(address, { abortEarly: false });
        // abortEarly = to show all error messages in error variable
        // in default "abortEarly: true" but we change it to "abortEarly: false"
        // user = to validate on user data
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

                <form onSubmit={submitAddressForm}>
                    {/*onSubmit = onClick in button tage but we used this attribute because whin click enter in keybord*/}

                    <label htmlFor="name" className=' my-2'>name :</label>
                    <input onChange={getUserData} type='address' className=' form-control mb-2' id='name' name='name' />

                    <label htmlFor="street" className=' my-2'>street :</label>
                    <input onChange={getUserData} type='address' className=' form-control mb-2' id='street' name='street' />

                    <label htmlFor="city" className=' my-2'>city :</label>
                    <input onChange={getUserData} type='address' className=' form-control mb-2' id='city' name='city' />

                    <label htmlFor="phone" className=' my-2'>phone :</label>
                    <input onChange={getUserData} type='address' className=' form-control mb-2' id='phone' name='phone' />

                    <div className=' d-flex justify-content-between align-items-center'>
                        <button type='supmit' className=' btn btn-outline-info mt-1 px-3 py-2'>
                            {isloading ? <i className=' fas fa-spinner fa-spin'></i> : "done"}
                            {/*create spinner to wait loading opration but if not loading opration show "Account" */}
                        </button>
                        {added ? <h4 className=' alert mt-4 py-1 alert-success w-50 text-center'>Address added</h4> : ""}
                    </div>
                </form>

            </div>
        </>
    )
}