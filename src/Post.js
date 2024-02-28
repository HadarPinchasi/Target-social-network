import { useState,useEffect, useRef } from 'react';
import commentsData from './comments.json';
import PostButtons from './PostButtons';
import newCommentInfo from './newCommentInfo';
import DropdownMenu from './DropdownMenu';
import PostEditForm from './PostEditForm';
import { useParams } from 'react-router-dom';

function Post() {
    const { id } = useParams();
    const [post, setPost] = useState({ profilePicture: 'beyonce/jpg', firstName: '', lastName: '', time: '', content: '', photo: 'beyonce/jpg' })
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:12345/articles/' + id)
                const post = await response.json()
                setPost(post)
            } catch (error) {
                // handle error
            }
        };
        fetchPosts();
    }, [id]);

    const postRef = useRef(null);
    const commentInputRef = useRef(null);
    const [commentsList, setCommentList] = useState(commentsData);
    const [editingContent, setEditingContent] = useState(null);
    const [postContent, setPostContent] = useState(post.content);
    const [editingPhoto, setEditingPhoto] = useState(null);
    const [postPhoto, setPostPhoto] = useState(post.photo);
    const handleDeletePost = () => {
        postRef.current.remove();
    };

    const handleEditPost = () => {
        setEditingContent(postContent);
        setEditingPhoto(postPhoto);
    };

    const handleSaveEdit = () => {
        setPostContent(editingContent);
        setPostPhoto(editingPhoto);
        setEditingContent(null);
        setEditingPhoto(null);
    };

    const handleCancelEdit = () => {
        setEditingContent(null);
        setEditingPhoto(null);
    };

    const handlePhotoChange = (event) => {
        setEditingPhoto(URL.createObjectURL(event.target.files[0]));
    };

    const handlePhotoDelete = () => {
        setEditingPhoto(null);
    };

    const addComment = (commentContent) => {
        if (!commentContent.trim()) {
            return;
        }
        const newComment = newCommentInfo(commentsList.length, id, commentContent);
        setCommentList([...commentsList, newComment]);
        commentInputRef.current.value = '';
    };

    return (
        <div className="card mt-3 " style={{ width: '40rem' }} ref={postRef}>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={post.profilePicture} className="rounded-circle" style={{ width: '40px', height: '40px', marginRight: '10px' }} height='100%' alt=" "></img>
                    <div>
                        <h5 className="card-title" style={{ margin: 0 }}>{post.firstName} {post.lastName}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary" style={{ margin: 1, marginTop: '5px' }}>{post.time}</h6>
                    </div>
                    <DropdownMenu handleDelete={handleDeletePost} handleEdit={handleEditPost} deleteObject='Delete post' editObject='Edit post' />
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
                <PostButtons id={id} commentsList={commentsList} addComment={addComment} commentInputRef={commentInputRef} />
            </div>
        </div>
    );
}

export default Post;
