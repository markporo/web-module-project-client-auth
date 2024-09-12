import React, { useContext, useState } from "react"
import { Redirect, } from "react-router";
import { useHistory } from "react-router";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { UserContext } from "./userContext";

const initialFormValues = { username: "", password: "" };

export default function Login() {
    const [formValues, setFormValues] = useState(initialFormValues);
    const { isLoading, setIsLoading } = useContext(UserContext);
    console.log(isLoading);

    let history = useHistory();

    const handleChange = (e) => {
        setFormValues({
            ...formValues, [e.target.name]: e.target.value
        })
    }

    const login = e => {
        e.preventDefault();
        setIsLoading(true);

        axiosWithAuth().post('/login', formValues)
            .then(res => {
                localStorage.setItem('token', res.data.payload);
                console.log("login", res);
                setIsLoading(false);
                history.push('/protected');
            })
            .catch(err => {
                console.log(err);
                <Redirect to="/login" />
            })
    }


    return (
        <div className="loginForm">
            <form onSubmit={login}>
                <input type="text" name="username" value={formValues.username} placeholder="UserName" onChange={handleChange} />
                <input type="text" name="password" value={formValues.password} placeholder="Password" onChange={handleChange} />
                <button>Log in</button>
            </form>
        </div>
    )

}