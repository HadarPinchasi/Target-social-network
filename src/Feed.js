import { useState } from 'react';
import './feed.css';
import MenuFeed from './MenuFeed';
import Post from './Post';
import posts from './posts.json';
import AddPost from './AddPost';
import leftMenuInfos from './leftMenuInfos';
import rightMenuInfos from './rightMenuInfos';
import TopScreen from './TopScreen';
import FriendRequest from "./FriendRequest";
import BirthdayCard from './BirthdayCard';
function Feed() {
    const [postsList, setPostList] = useState(posts);
   
    const addPost = (content, photo) => {
        if (!content.trim() && !photo) {
            return;
        }
        const post = {
            id: postsList.length + 1,
            profilePicture: "photos/profile.jpg",
            firstName: "Hadar",
            lastName: "Pinchasi",
            time: "few seconds ago",
            content: content,
            photo: photo ? URL.createObjectURL(photo) : null,
            likes: 0,
            comments: 0,
            shares: 0
        };

        setPostList([post, ...postsList]);
    };

    return (
        <div className="container-fluid ">
            <TopScreen/>
            <div className="row  second">
               
                <div className="col d-none d-lg-block">
                    <MenuFeed menuInfos={leftMenuInfos} />
                </div>
                <div className="col-lg-6 col-s-1">
                    <AddPost onAddPost={addPost} />
                    {postsList.map((post) => <Post key={post.id} {...post} />)}
                </div>
                <div className="col d-none d-lg-block">
                    <FriendRequest />
                    <BirthdayCard/>
                    <MenuFeed menuInfos={rightMenuInfos} />
                </div>
            </div>
        </div>
    );
}

export default Feed;
