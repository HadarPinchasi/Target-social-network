// JavaScript source code
import { useState, useEffect, useRef } from 'react';
import DropdownMenu from "./DropdownMenu";
import Post from './Post';
import { useNavigate } from 'react-router-dom';

function PersonalBoxPost({ firstName, lastName, userName, token1, myUser, handleDeleteFriend, profilePicture }) {
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const [myFriend, SetMyFriend] = useState(null)
    const [requestSent, setRequestSent] = useState(false);
    
    useEffect(() => {
        const getFriends = async () => {
            const response = await fetch('http://localhost:12345/api/users/' + myUser.userName + '/friends', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'bearer ' + token1
                }
            }); 
            const friends = await response.json();
/*            console.log(friends);
*/            if (response.ok) {
                const isFriend = friends.some(friend => friend.userName === userName);
                if (isFriend) {
                    SetMyFriend(true)
                }
                if (!isFriend) {
                    SetMyFriend(false)
                }
            }
            else if (response.status === 404)
                console.log('no user')
            
        };
        getFriends();
    }, []);
    const deleteFriend = async () => {
        try {
            const response = await fetch('http://localhost:12345/api/users/' + myUser.userName + '/friends/' +
                userName,
                {
                    method: "DELETE",
                    headers: {
                        'authorization': 'bearer ' + token1
                    },
                });
            if (response.ok) {
                SetMyFriend(false)
                handleDeleteFriend(userName)
            }
            console.log(response);
        } catch (error) {
            console.error('Error deleting request:', error);
        }
    }  
    const navigateToPersonalData = () => {
        if (modalRef.current) {
            const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
            modalInstance.hide();
        }
        navigate('/personalData', {
            state: {
                token: token1,
                userName: userName,
                myUser: myUser,
                profilePicture: profilePicture,
            }
        });
    };
  
    async function sendRequestFriend() {
        const response = await fetch('http://localhost:12345/api/users/' + userName + '/friends', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + token1

            },
            body: JSON.stringify({
                userName: myUser.userName
            })
        })
        if (response.ok) {
            setRequestSent(true)
        }
        else if (response.status === 403) {
         await   alert('You have already sent this user a friend request')
           await setRequestSent(true)
        }
        else {
            console.log("Problem occured while sending friend request")
        }
    }
    return (
        <div>
            <button type="button" className="btn btn-transparent"
                data-bs-toggle="modal" style={{ fontSize: '16px', fontWeight: 'bold' }} data-bs-target={"#personalBoxPost" + userName}>
                {firstName} {lastName}
            </button>
            <div className="modal fade" id={"personalBoxPost"+userName} tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true" ref={modalRef} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                <img src={profilePicture} className="rounded-circle"
                                    style={{ width: '30px', height: '30px', marginRight: '10px' }}
                                    height='100%' alt="" /> {firstName} {lastName}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {myFriend || userName === myUser.userName ? (
                                <div>
                                    <button className="btn btn-primary col-md-4" onClick={navigateToPersonalData}>Click here to {firstName}'s posts</button>
                                    {myFriend && userName !== myUser.userName ? (
                                        <button type="button" onClick={deleteFriend} className="btn btn-secondary col-md-6">Remove {firstName} from your friends</button>
                                    ) : null}
                                </div>
                            ) : (
                                <button
                                    className="btn btn-primary col-md-4"
                                    onClick={sendRequestFriend}
                                    disabled={requestSent}
                                >
                                    {requestSent ? 'Friend request sent' : 'Friend Request'}
                                </button>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalBoxPost;
