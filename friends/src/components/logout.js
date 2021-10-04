import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Logout = () => {
    console.log("logout")

    axiosWithAuth().post('/logout')
        .then(res => {
            localStorage.removeItem('token')
            window.location.pathname = '/login'
        })
        .catch(err => console.log(err))

    return (
        <div>Logged Out</div>
    )
}

export default Logout;