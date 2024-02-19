import React from 'react';

function PostAddButton({ onAddPost, setInputContent }) {
    const addPost = () => {
        onAddPost();
        setInputContent('');
    };

    return (
        <button className="btn btn-primary" type="button" onClick={addPost}>Post</button>
    );
}

export default PostAddButton;
