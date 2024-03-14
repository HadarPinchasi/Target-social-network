import React, { useState } from 'react';
import PostAddButton from './PostAddButton';
import { FcVideoCall } from "react-icons/fc";
import './feed.css';

function AddPost({ onAddPost, myUser }) {

    const [inputContent, setInputContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));
    }

    const addPost = () => {
        onAddPost(inputContent, selectedFile);
        setInputContent('');
        setSelectedFile(null);
        setImagePreview('');
    };
    return (
        <div className="card mt-3" style={{ width: '40rem' }}>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={myUser.profilePic} className="rounded-circle" style={{ width: '40px', height: '40px', marginRight: '10px' }} height='100%' alt=" "></img>
                    <div className="input-group mb-3">   
                        <input type="text" className="form-control" placeholder="What are you thinking about?" aria-label="Recipient's username"
                            aria-describedby="button-addon2" value={inputContent} onChange={(e) => setInputContent(e.target.value)} />
                        <div className="input-group-append">
                        </div>
                        <button className="btn btn-primary" type="button" onClick={addPost}>Post</button>
                    </div>
                </div>
                {imagePreview && (
                    <img src={imagePreview} className="card-img-bottom" style={{ maxHeight: '500px' }}  alt="Selected" />

                )}
                <hr className="card-divider" />
                <div className="row" id='buttonRow'>
                    <button type="button" className="btn btn-light col-md-4"><i className="bi bi-camera-video-fill m-2 " style={{ color: '#dc3545', fontSize: '1.5rem' }}></i>Live video</button>
                    <label className="btn btn-light col-md-4" > <i className="bi bi-file-earmark-image m-2" style={{ color: '#20c997', fontSize: '1.5rem' }}></i>
                        photo <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                    </label>
                    <button type="button" className="btn btn-light col-md-4"><i className="bi bi-emoji-smile m-2" style={{ color: 'orange', fontSize: '1.5rem' }}></i> Feeling/activity</button>
                </div>
            </div>
        </div>
    );
}

export default AddPost;
