import React, { useContext, useState } from "react";
import { UserContext } from "./userContext";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router";

import Friends from "./Friends"

const initialFriendData = {
    id: 1,
    name: 'Joe',
    age: 24,
    email: 'joe@lambdaschool.com',
}

export default function FriendList() {
    const [newFriendData, setNewFriendData] = useState(initialFriendData);
    const { isLoading, setIsLoading } = useContext(UserContext);
    let history = useHistory();

    const changeHandler = (e) => {
        setNewFriendData({
            ...newFriendData,
            [e.target.name]: e.target.value
        })
    }

    // function handleChange(evt) {
    //     const value =
    //       evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    //     setState({
    //       ...state,
    //       [evt.target.name]: value
    //     });
    //   }

    const addNewFriend = () => {
        axiosWithAuth().post('/friends', newFriendData)
            .then(res => {
                console.log("login", res);

                history.push('/protected');
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            {isLoading ? "Loading FriendList..." : <Friends initialFriendData={initialFriendData} />}
            <br />
            <form onSubmit={addNewFriend}>
                <label> Name:
                    <input type="text" name="name" value={newFriendData.name} onChange={changeHandler} />
                </label>
                <label> Email:
                    <input type="email" name="email" value={newFriendData.email} onChange={changeHandler} />
                </label>
                <label> Age:
                    <input type="text" name="age" value={newFriendData.age} onChange={changeHandler} />
                </label>
                <label> Friend ID:
                    <input type="text" name="id" value={newFriendData.id} onChange={changeHandler} />
                </label>
                <button>Add New Friend</button>
            </form>
        </div>
    )
}