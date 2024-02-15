import { useState } from 'react';

function PostEditForm({ editingContent, editingPhoto, onContentChange, onPhotoChange, onPhotoDelete, onSaveEdit, onCancelEdit }) {
    return (
        <div className="card-text" style={{ marginTop: '10px' }}>
            <input type="text" className="form-control" style={{ width: '600px' }} value={editingContent} onChange={(e) => onContentChange(e.target.value)} />
            {editingPhoto && (
                <div>
                    <img src={editingPhoto} alt="Edited" style={{ maxWidth: '606px', maxHeight: '500px' }} />
                </div>
            )}
            <div class="row">
                <label className="btn btn-light col-md-3" style={{ maxHeight: '37px' }}>
                    change photo <input type="file" accept="image/*" style={{ display: 'none' }} onChange={onPhotoChange} />
                </label>
{/*                <input type="file" className='btn btn-light col mb-3' onChange={onPhotoChange} accept="image/*" /> 
*/}                <button className='col btn btn-light mb-3' onClick={onPhotoDelete}>Delete Photo</button>
                <button className="btn btn-light btn-primary col mb-3" onClick={onSaveEdit}>Save</button>
                <button className="btn btn-light btn-secondary col mb-3" onClick={onCancelEdit}>Cancel</button>
        </div>
        </div>
    );
}

export default PostEditForm;
