// JavaScript source code
import { useState, useEffect } from 'react';

function FriendRequest({ userName, firstName, lastName, profilePic, token, myUser, handleDeleteReq, friendsList, setFriendsList }) {

    const approveReq = async () => {
        try {
            const response = await fetch('http://localhost:12345/api/users/' + myUser.userName + '/friends/' +
                userName,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': 'bearer ' + token
                    },
                });
            if (response.ok) {
                handleDeleteReq(userName);
                setFriendsList([...friendsList, { userName, firstName, lastName, profilePic }]);

            }
            console.log(response);
        } catch (error) {
            console.error('Error approving request:', error);
        }
    }
    const deleteReq = async () => {
        try {
            const response = await fetch('http://localhost:12345/api/users/' + myUser.userName + '/friends/' +
                userName,
                {
                    method: "DELETE",
                    headers: {
                        'authorization': 'bearer ' + token
                    },
                });
            if (response.ok) {
                handleDeleteReq(userName);
            }
            console.log(response);
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    }



    return (
        <div className="card-body mt-3 rounded" id='wannaShadow' style={{ display: 'flex', flexDirection: 'column' }}>
            <h6 className="card-title mb-2">Friends request </h6>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={profilePic} className="rounded-circle" style={{ width: '40px', height: '40px', marginRight: '10px' }} height='100%' alt="" />
                <div className="card card-body border-0" style={{ backgroundColor: 'transparent', width: '10rem' }}>{firstName} {lastName}
                    <h6 className="card-subtitle mb-2 text-body-secondary"> </h6>
                    <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button type="button" onClick={approveReq} className="btn btn-primary col-md-6" >Confirm</button>
                        <button type="button" onClick={deleteReq}  className="btn btn-secondary col-md-6" >Delete</button>
                    </div>
                </div>
            </div>
            <hr className="card-divider" />
        </div>
    );
}
export default FriendRequest;