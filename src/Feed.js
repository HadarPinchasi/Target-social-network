import { useState } from 'react';
import './feed.css';
import MenuFeed from './MenuFeed';
import Post from './Post';
import posts from './posts.json';
import AddPost from './AddPost';
import leftMenuInfos from './leftMenuInfos';
import rightMenuInfos from './rightMenuInfos';
import { FaFacebook } from "react-icons/fa";

function Feed() {
    const [postsList, setPostList] = useState(posts);
    
    const addPost = (content, photo) => {
        if (!content.trim() && !photo) {
            return;
        }
        const post = {
            id: postsList.length + 1,
            profilePicture: "beyonce.jpg",
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
        <div className="container-fluid">
            <nav class="navbar fixed-top bg-body-tertiary shadow p-3 ">
                <div class="container ">
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div class="d-flex align-items-center">
                                    <FaFacebook className="col-3" style={{ fontSize: '2.5rem', color: 'blue' }} />
                                    <input class="form-control me-2 col-9" type="search" placeholder="Search Facebook" aria-label="Search" style={{ width: "10rem" }} />
                                </div>
                            </div>

                        </div>
                        <div className="col-6">

                        gg
                        </div>
                        <div className="col">
                        gg
                        </div>
                    </div>
                </div>
            </nav>

            <div className="row">
                <div className="col">
                    <MenuFeed menuInfos={leftMenuInfos} />
                </div>
                <div className="col-6">
                 <AddPost onAddPost={addPost} />
                  {postsList.map((post) => <Post key={post.id} {...post} />)}
                </div>
                <div className="col">
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
                        <h6 className="card-title mb-2">Friends request </h6>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src='beyonce.jpg' className="rounded-circle" style={{ width: '40px', height: '40px', marginRight: '10px' }} height='100%' alt="" />
                            <div className="card card-body border-0" style={{ backgroundColor: 'transparent', width: '10rem' }}>
                                <h6 className="card-subtitle mb-2 text-body-secondary">pedut kliman</h6>
                                <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button type="button" className="btn btn-primary col-md-6">Confirm</button>
                                    <button type="button" className="btn btn-primary col-md-6">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body" style={{ width: '16rem'}}>
                            <h6 class="card-subtitle mb-2 text-body-secondary"> Birthdays</h6>
                        <p class="card-text"><i class="bi bi-gift-fill m-2" style={{color:''} }></i> Pedut Kliman's birthday is today.</p>
                        </div>
                    <MenuFeed menuInfos={rightMenuInfos} />
                </div>
            </div>
        </div>
    );
}

export default Feed;
