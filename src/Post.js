import Comment from './Comment';
import { useState, useRef } from 'react';
import commentsData from './comments.json';
import AddComment from './AddComment';
import PostButtons from './PostButtons';
import newCommentInfo from './newCommentInfo';
import DropdownMenu from './DropdownMenu';
import PostEditForm from './PostEditForm';
import PersonalBoxPost from './PersonalBoxPost';///
function Post({ id, profilePicture, firstName, lastName, time, content, photo, token, userName, onDeletePost, myUser, token1, handleDeleteFriend }) {
    const postRef = useRef(null);
    const commentInputRef = useRef(null);
    const [commentsList, setCommentList] = useState(commentsData);
    const [editingContent, setEditingContent] = useState(null);
    const [postContent, setPostContent] = useState(content);
    const [editingPhoto, setEditingPhoto] = useState(null);
    const [postPhoto, setPostPhoto] = useState(photo);

    async function handleDeletePost() {
        try {
            const response = await fetch('http://localhost:12345/api/users/' + userName + '/posts/' + id, {
                method: "DELETE",
                headers: {
                    'authorization': 'bearer ' + token
                },
            });

            if (response.ok) {
                onDeletePost(id);
            } else if (response.status === 404) {
                alert('problem deleting');
            } else if (response.status === 401 || response.status === 403) {
                alert('you are not allowed to delete this post');
            }
        } catch (error) {
            alert('delete post.');
        }
    }
    async function handleSaveEdit() {
        const response = await fetch('http://localhost:12345/api/users/' + userName + '/posts/' + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + token
            },
            body: JSON.stringify({
                content: editingContent,
                photo: editingPhoto
            })
        });
        if (response.ok) {
            console.log(editingContent)
            setPostContent(editingContent);
            setPostPhoto(editingPhoto);
            setEditingContent(null);
            setEditingPhoto(null);
        }
        else if (response.status === 404)
            alert('problem editing')
        else if (response.status === 401 || response.status === 403)
            alert('you are not allowd to edit this post')
    }

    const handleEditPost = () => {
        setEditingContent(postContent);
        setEditingPhoto(postPhoto);
    };

    const handleCancelEdit = () => {
        setEditingContent(null);
        setEditingPhoto(null);
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            setEditingPhoto(reader.result);
        };

        reader.readAsDataURL(file);
    };


    const handlePhotoDelete = () => {
        setEditingPhoto(null);
    };
    const formattedTime = new Date(time).toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });

    const addComment = (commentContent) => {
        if (!commentContent.trim()) {
            return;
        }

        const newComment = newCommentInfo(commentsList.length, id, commentContent,myUser);

        setCommentList([...commentsList, newComment]);
        commentInputRef.current.value = '';
    };

    return (
        <div className="card mt-3 " style={{ width: '40rem' }} ref={postRef}>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={profilePicture} className="rounded-circle" style={{ width: '40px', height: '40px', marginRight: '10px' }} height='100%' alt=" "></img>
                    <div>
                        <h5 className="card-title" style={{ margin: 0 }}>
                            {myUser && (<PersonalBoxPost firstName={firstName} lastName={lastName} userName={userName} token1={token1} myUser={myUser} handleDeleteFriend={handleDeleteFriend} profilePicture={profilePicture} />)}
                            </h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary" style={{ margin: 1, marginTop: '5px' }}>{formattedTime}</h6>
                    </div>
                    {token !== null&& (
                        <DropdownMenu handleDelete={handleDeletePost} handleEdit={handleEditPost} deleteObject='Delete post' editObject='Edit post' />
                    )}
                </div>
                {editingContent !== null ? (
                    <PostEditForm editingContent={editingContent} editingPhoto={editingPhoto} onContentChange={setEditingContent}
                        onPhotoChange={handlePhotoChange} onPhotoDelete={handlePhotoDelete} onSaveEdit={handleSaveEdit} onCancelEdit={handleCancelEdit}
                    />
                ) : (
                    <div>
                        <p className="card-text" style={{ marginTop: '10px' }}>{postContent} </p>
                        <img src={postPhoto} className="card-img-bottom" style={{ maxHeight: '500px' }} alt=""></img>
                    </div>
                )}
                <hr className="card-divider" />

                <PostButtons id={id} commentsList={commentsList} addComment={addComment} commentInputRef={commentInputRef} myUser={myUser} />

            </div>

        </div>
    );
}

export default Post;