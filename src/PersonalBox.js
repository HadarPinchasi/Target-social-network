import { useState, useEffect } from 'react';
import DropdownMenu from "./DropdownMenu";
import Post from './Post';
import { useNavigate } from 'react-router-dom';

function PersonalBox({ myUser, handleDeleteUser, modalRef, setMyUser, token, updatePostsWithNewName, handleDeletePost }) {
    const navigate = useNavigate();

    const [editingFirstName, setEditingFirstName] = useState(myUser.firstName);
    const [editingLastName, setEditingLastName] = useState(myUser.lastName);
    const [profilePic, setProfilePic] = useState(myUser.profilePic);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditUser = () => {
        setIsEditing(true);
    };

    function readImageFile(e) {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onload = function () {
            setProfilePic(reader.result);
        };

        reader.readAsDataURL(file);
    }

    async function handleSaveEdit() {
        const response = await fetch('http://localhost:12345/api/users/' + myUser.userName, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'authorization': 'bearer ' + token
            },
            body: JSON.stringify({
                firstName: editingFirstName,
                lastName: editingLastName,
                profilePic: profilePic
            })
        });
        if (response.status === 200) {
            await setMyUser({ ...myUser, firstName: editingFirstName, lastName: editingLastName, profilePic: profilePic });
            updatePostsWithNewName(editingFirstName, editingLastName, profilePic);
            await setIsEditing(false);
        }
        else if (response.status === 404)
            alert('problem editing')
        else if (response.status === 401 || response.status === 403)
            alert('you are not allowd to edit this user')
    }

    const handleCancelEdit = () => {
        setEditingFirstName(myUser.firstName);
        setEditingLastName(myUser.lastName);
        setIsEditing(false);
    };

    const navigateToPersonalData = () => {
        if (modalRef.current) {
            const modalInstance = window.bootstrap.Modal.getInstance(modalRef.current);
            modalInstance.hide();
        }
        navigate('/personalData', {
            state: {
                token: token,
                userName: myUser.userName,
                myUser: myUser,
                profilePicture: myUser.profilePic
            }
        });
    };

    return (
        <li className="list-group-item w-100 m-2 rounded" id='wannaShad'>
            <span className="object m-2">
                <img src={profilePic} className="rounded-circle"
                    style={{ width: '30px', height: '30px', marginRight: '10px' }}
                    height='100%' alt="" />
            </span>
            <button type="button" className="btn btn-transparent"
                data-bs-toggle="modal" data-bs-target="#personalBox">
                {editingFirstName} {editingLastName}
            </button>
            <div className="modal fade" id="personalBox" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                <img src={profilePic} className="rounded-circle"
                                    style={{ width: '30px', height: '30px', marginRight: '10px' }}
                                    height='100%' alt="" />
                                {isEditing ? (
                                    <>
                                        <input type="text" className="form-control" value={editingFirstName}
                                            onChange={(e) => setEditingFirstName(e.target.value)} />
                                        <input type="text" className="form-control" value={editingLastName}
                                            onChange={(e) => setEditingLastName(e.target.value)} />
                                        <label className="btn btn-light" style={{ maxHeight: '37px' }}>
                                            Change Profile Picture <input type="file" accept="image/*" style={{ display: 'none' }} onChange={readImageFile} />
                                        </label>
                                    </>
                                ) : (
                                    <>
                                        {editingFirstName} {editingLastName}
                                    </>
                                )}
                                <DropdownMenu handleDelete={handleDeleteUser} handleEdit={handleEditUser}
                                    deleteObject='Delete account' editObject='Edit account'
                                    onSaveEdit={handleSaveEdit} onCancelEdit={handleCancelEdit} isEditing={isEditing} />
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <button className="btn btn-primary col-md-4" onClick={navigateToPersonalData}>Click here to see posts</button>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default PersonalBox;
