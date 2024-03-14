// JavaScript source code
import { useState, useEffect } from 'react';
import Post from './Post';
import TopScreen from './TopScreen';
import MenuFeed from './MenuFeed';
import leftMenuInfos from './leftMenuInfos';
import { useLocation, useNavigate } from 'react-router-dom';
import Friends from './Friends';

function PersonalData() {
    const navigate = useNavigate();
    const location = useLocation();
    const { token, userName, myUser, profilePicture } = location.state;
    const [userPostsList, setuserPostsList] = useState([]);
    useEffect(() => {
        const fetchUserPosts = async () => {
            const res = await fetch('http://localhost:12345/api/users/' + userName + '/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'bearer ' + token
                }
            });
            const data = await res.json();
            setuserPostsList(data);
        };
        fetchUserPosts();
    }, []);
    const navigateToFeed = () => {

        navigate('/Feed', {
            state: {
                token: token,
                username: myUser.userName,
            }
        });
    };

    return (
        <div className="container-fluid ">
            <TopScreen />
            <div className="row  second">
                <div className="col d-none d-lg-block">
                    <button type="button" className="btn btn-primary col-md-12"
                        onClick={navigateToFeed}>Go Back To Feed</button>
                    <MenuFeed menuInfos={leftMenuInfos} />
                </div>
                <div className="col-lg-6 col-s-1">
                    {userPostsList.map((post) => (
                        <Post
                            key={post._id}
                            id={post._id}
                            profilePicture={profilePicture}
                            firstName={post.firstName}
                            lastName={post.lastName}
                            time={post.time}
                            content={post.content}
                            photo={post.photo}
                            token={post.userName === myUser.userName ? token : null}
                            userName={post.userName}
                            myUser={myUser }
                        />
                    ))}
                </div>
                <div className="col d-none d-lg-block">
                    <Friends myUser={myUser} userName={userName} token={token} />

                </div>
            </div>

        </div>
    );
}

export default PersonalData;
