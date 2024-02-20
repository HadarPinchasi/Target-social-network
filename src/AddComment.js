import { useState, useRef } from 'react';

function AddComment({ addComment,commentInputRef } ) {

    return (
        <div className="card border-0" style={{ width: '40rem', height: '5rem' }}>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="photos/profile.jpg" className="rounded-circle" style={{ width: '40px', height: '40px', marginRight: '10px' }} height='100%' alt=" "></img>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Writing comment" aria-label="Recipient's username"
                            aria-describedby="button-addon2" ref={commentInputRef} />
                        <div className="input-group-append">
                            <button className="btn btn-primary"
                                type="button" onClick={() => addComment(commentInputRef.current.value)}>Comment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddComment; 