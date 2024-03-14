// JavaScript source code
import { useState, useEffect } from 'react';
import Friend from "./Friend";
function Friends({ myUser,userName, token }) {
    const [friendsList, setFriendsList] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
            const response = await fetch('http://localhost:12345/api/users/' + userName
                + '/friends',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'bearer ' + token
                }
            });
            const friendData = await response.json();
            await setFriendsList(friendData);
        };
        getFriends();

    }, []);
    const handleDeleteFriend = (userName) => {
        const updatedFriendsList = friendsList.filter(friend => friend.userName !== userName);
        setFriendsList(updatedFriendsList);
    };
    return (
        <li className="list-group-item w-100 m-2 rounded" id='wannaShad'>
            <span className="object m-2" style={{ color: '#0dcaf0' }}>
                <i className="bi bi-people "></i>
            </span>
            <button type="button" className="btn btn-transparent" data-bs-toggle="modal" data-bs-target="#personalBoxFriends">
                Friends
            </button>
            <div className="modal fade" id="personalBoxFriends" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Your Friends
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {friendsList.map((friend) => (
                                <Friend key={friend._id}
                                    userName={friend.userName}
                                    firstName={friend.firstName}
                                    lastName={friend.lastName}
                                    profilePic={friend.profilePic}
                                    token={token}
                                    myUser={myUser}
                                    handleDeleteFriend={handleDeleteFriend} />
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );

}

export default Friends;
