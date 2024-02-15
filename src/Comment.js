import { useState, useRef } from 'react';
import DropdownMenu from './DropdownMenu';

function Comment({ id, Postid, CommentprofilePicture, CommentfirstName, CommentlastName, Commentcontent }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(Commentcontent);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleEditComment = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        setEditedContent(commentInputRef.current.value);
        setIsEditing(false);
    };

    const commentInputRef = useRef(null);
    const handleDeleteComment = () => {
        setIsDeleted(true);
    };

    if (isDeleted) {
        return null;
    }

    return (
        <div className="card border-0" style={{ width: '40rem', height: '8rem' }} ref={commentInputRef}>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={CommentprofilePicture} className="rounded-circle" style={{ width: '40px', height: '40px', marginRight: '10px' }} height='100%' alt="" />
                        <div className="card card-body border-0" style={{ backgroundColor: 'lightgray', width: 'calc(100% - 50px)', maxWidth:'550px', borderRadius: '16px', position: 'relative', marginRight: '5px' }}>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{CommentfirstName} {CommentlastName}</h6>
                            {isEditing ? (
                                <>
                                    <input type="text" className="form-control mb-2" defaultValue={editedContent} ref={commentInputRef} />
                                    <div className="row"> 
                                    <button className="btn btn-primary btn-sm me-1 col-md-6" onClick={handleSaveEdit}>Save</button>
                                        <button className="btn btn-secondary btn-sm col-md-6" onClick={() => setIsEditing(false)}>Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="card-text">{editedContent}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <DropdownMenu handleDelete={handleDeleteComment} handleEdit={handleEditComment} deleteObject='Delete Comment' editObject='Edit Comment' />
                </div>
            </div>
        </div>
    );
}

export default Comment;
