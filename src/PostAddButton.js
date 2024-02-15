import React from 'react';

function PostAddButton({ onAddPost, setInputContent }) {
    const addPost = () => {
        onAddPost();
        setInputContent('');
    };

    return (
        <button className="btn btn-outline-secondary" style={{ backgroundColor: '#6f42c1', color: 'black' }} type="button" onClick={addPost}>Post</button>
    );
}

export default PostAddButton;
