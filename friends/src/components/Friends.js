import React, { useEffect, useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const Friends = ({ initialFriendData }) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        axiosWithAuth().get("/friends")
            .then((res) => {
                console.log(res.data)
                setFriends(res.data);

            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {

            })
    })


    return (
        <div>
            <h1>Your Best Bitches</h1>
            {console.log(friends)}
            {friends.map(friend => (<div>{friend}</div>))}

        </div>
    )
}

export default Friends;