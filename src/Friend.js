// JavaScript source code
function Friend({ userName, firstName, lastName, profilePic, token, myUser }) {

    return (
        <li className="list-group-item w-100 m-2 rounded" id='wannaShad'>
            <span className="object m-2">
                <img src={profilePic} className="rounded-circle" style={{ width: '30px', height: '30px', marginRight: '10px' }} height='100%' alt="" />
            </span>

            {firstName} {lastName}

        </li>
    );
}

export default Friend;
