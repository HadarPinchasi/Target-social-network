import { useState, useEffect, useRef } from 'react';
import './feed.css';
import MenuFeed from './MenuFeed';
import Post from './Post';
import leftMenuInfos from './leftMenuInfos';
import rightMenuInfos from './rightMenuInfos';
import TopScreen from './TopScreen';
import BirthdayCard from './BirthdayCard';
import { useNavigate, useLocation } from 'react-router-dom';
import AddPost from './AddPost';
import PersonalBox from './PersonalBox';
import FriendsRequests from './FriendsRequests';
import Friends from './Friends';
import Friend from "./Friend";

function Feed() {
    const location = useLocation();
    const { token, username} = location.state;
    const navigate = useNavigate();
    const [postsList, setPostList] = useState([]);
    const [showFeed, setShowFeed] = useState(true)
    const [myUser, setMyUser] = useState('')///
    const modalRef = useRef(null);
    const [friendsList, setFriendsList] = useState([]);

    useEffect(() => {
        try {
            const getUser = async () => {
                const response = await fetch('http://localhost:12345/api/users/' + username, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'bearer ' + token
                    }
                });
                const userData = await response.json();
/*                console.log(userData)
*/                if (response.status === 403) {
                    setShowFeed(false)
                }  if (response.ok) {
                    setShowFeed(true)
                    await setMyUser(userData)
                } else {
                    throw new Error('Server response was not ok.');
                }
            };
            getUser();
        } catch (error) {
            console.error('Error sending data to server:', error);
            
        }

    }, []);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('http://localhost:12345/api/articles', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'bearer ' + token
                }
            });
            const data = await res.json();
            setPostList(data);
        };

        fetchPosts();
    }, []);
const addPost = async (content, photoFile) => {
    try {
        if (!content.trim() && !photoFile) {
            return;
        }
        let photo = '';
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function () {
                photo = reader.result;
                // Now that the photo is loaded, send the post data to the server
                sendPostData(content, photo);
            };
            reader.readAsDataURL(photoFile);
        } else {
            // No photo selected, send the post data to the server without a photo
            sendPostData(content, photo);
        }
    } catch (error) {
        console.error('Error sending data to server:', error);
        // Handle error
    }
};

    const sendPostData = async (content, photo, profilePic) => {
    try {
        const post = {
            firstName: myUser.firstName,
            lastName: myUser.lastName,
            content: content,
            userId: myUser._id,
            userName: myUser.userName,
            photo: photo,
            profilePic: profilePic
        };
        const res = await fetch('http://localhost:12345/api/users/:' + username + '/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + token
            },
            body: JSON.stringify(post)
        });
        const postData = await res.json();
        if (res.status === 201) {
            setPostList([postData.article, ...postsList]);
        }
    } catch (error) {
        console.error('Error sending data to server:', error);
        // Handle error
    }
};
    const handleDeletePost = (postId) => { 
        const updatedPostsList = postsList.filter(post => post._id !== postId);
        setPostList(updatedPostsList);
    };

    const handleDeleteUser = async () => {
        try {
            const res = await fetch('http://localhost:12345/api/users/' + myUser.userName, {
                method: 'DELETE',
                headers: {
                    'authorization': 'bearer ' + token
                }
            });

            if (res.status === 401 || res.status === 403) {
                console.log('You are not allowed to delete this account');
            } else if (res.status === 404) {
                console.log('User not found');
            } else if (res.status === 200) {
                if (modalRef.current) {
                    const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
                    modalInstance.hide();
                }
                await setMyUser(null);
                navigate("/");
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
    useEffect(() => {
        if (myUser) {
            const getFriends = async () => {
                const response = await fetch('http://localhost:12345/api/users/' + myUser.userName + '/friends', {
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
        }
    }, [myUser]);

    const updatePostsWithNewName = (newFirstName, newLastName, newProfilePic) => {
        const updatedPosts = postsList.map((post) => {
            if (post.userName === myUser.userName) {
                return { ...post, firstName: newFirstName, lastName: newLastName, profilePic: newProfilePic };
            }
            return post;
        });
        setPostList(updatedPosts);
    };
    const handleDeleteFriend = (userName) => {
        const updatedFriendsList = friendsList.filter(friend => friend.userName !== userName);
        setFriendsList(updatedFriendsList);
    };

    return (
        <div className="container-fluid ">
             {showFeed ? (
                <>
                    {myUser && (<TopScreen profilePic={myUser.profilePic} />)}

            <div className="row  second">
                <div className="col d-none d-lg-block">
                            {myUser && (
                                <PersonalBox myUser={myUser} handleDeleteUser={handleDeleteUser} modalRef={modalRef} setMyUser={setMyUser}
                                    token={token} updatePostsWithNewName={updatePostsWithNewName} handleDeletePost={handleDeletePost}
                                />
                            )}
                    <MenuFeed menuInfos={leftMenuInfos} />
                </div>
                <div className="col-lg-6 col-s-1">
                            <AddPost onAddPost={addPost} myUser={myUser} />
                    {postsList.map((post) => (
                        <Post
                            key={post._id}
                            id={post._id}
                            profilePicture={post.profilePic}
                            firstName={post.firstName}
                            lastName={post.lastName}
                            time={post.time}
                            content={post.content}
                            photo={post.photo}
                            token={post.userName === myUser.userName ? token : null}
                            userName={post.userName}
                            onDeletePost={handleDeletePost}
                            myUser={myUser}
                            token1={token}
                            handleDeleteFriend={handleDeleteFriend }
                        />
                    ))}
                </div>
                        <div className="col d-none d-lg-block">
                            <BirthdayCard />  
                            {myUser && (
                                <FriendsRequests myUser={myUser} token={token} friendsList={friendsList} setFriendsList={setFriendsList} />
                            )}      
                            <span className="object m-2" style={{ color: '#0dcaf0' }}>
                                <i className="bi bi-people "></i>
                            </span> My Friends names:
                            {friendsList.map((friend) => (
                                <Friend key={friend._id} userName={friend.userName} firstName={friend.firstName} lastName={friend.lastName}
                                    profilePic={friend.profilePic} token={token} myUser={myUser} handleDeleteFriend={handleDeleteFriend} />
                            ))}

{/*                            <Friends myUser={myUser} userName={myUser.userName} token={token} />
*/}
{/*                    <MenuFeed menuInfos={rightMenuInfos} />
*/}                </div>
            </div>
         </>
            ) : (
                navigate('/details')
            )}
        </div>
    );
}

export default Feed;