// PostButtons.js
import React from 'react';
import './PostButtons.css';
import Comment from './Comment';
import AddComment from './AddComment';
import { FaRegShareSquare } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";

function PostButtons({ id, commentsList, addComment, commentInputRef }) {
    return (
        <div className="row">
            <input type="checkbox" className="btn-check col-md-4 " id={`btn-check-outlined-${id}`} autoComplete="off" />
            <label className="btn btn-outline-primary col-md-4 border-0" id="likeButton" htmlFor={`btn-check-outlined-${id}`}>
                <i className="bi bi-hand-thumbs-up"></i>Like
            </label>
            <button type="button" class="btn btn-primary col-md-4 btn-light" data-bs-toggle="modal" data-bs-target={`#exampleModal-${id}`}>
                <i class="bi bi-chat"></i> Comment
            </button>
            <div class="modal fade" id={`exampleModal-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered justify-content-center">
                    <div class="modal-content" style={{ width: '45rem' }}>
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel" >Comments</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {commentsList
                                .filter(comment => comment.Postid === id)
                                .map(comment => <Comment key={comment.id} {...comment} />)
                            }
                            <AddComment addComment={addComment} commentInputRef={commentInputRef} />
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-secondary dropdown-toggle col-md-4 btn btn-light " style={{ color: 'black' }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FaRegShareSquare /> Share
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item"><FaRegShareSquare class=" m-2" /> Share now (Friends)</a></li>
                <li><a class="dropdown-item"><i class="bi bi-pencil-square m-2"></i> Share to Feed</a></li>
                <li><a class="dropdown-item"> <i class="bi bi-plus-circle m-2"></i> Share to your story (Friends)</a></li>
                <li><a class="dropdown-item"><i class="bi bi-messenger m-2"></i> Send in Messenger</a></li>
                <li><a class="dropdown-item"><i class="bi bi-whatsapp m-2"></i> Send in Whatsapp</a></li>
                <li><a class="dropdown-item"><GrGroup class=" m-2" />Share to a group</a></li>
                <li><a class="dropdown-item"> <i class="bi bi-people m-2"></i> Share on a friend's profile</a></li>
            </ul>
            
        </div>
    );
}

export default PostButtons;
