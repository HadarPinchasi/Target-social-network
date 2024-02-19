// JavaScript source code
import './feed.css';

function FriendRequest() {
    return (
        <div className="card-body mt-3 rounded" id='wannaShadow' style={{ display: 'flex', flexDirection: 'column' }}>
            <h6 className="card-title mb-2">Friends request </h6>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src='photos/shtra.jpg' className="rounded-circle" style={{ width: '40px', height: '40px', marginRight: '10px' }} height='100%' alt="" />
                <div className="card card-body border-0" style={{ backgroundColor: 'transparent', width: '10rem' }}>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Hadar Shtrasberg</h6>
                    <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button type="button" className="btn btn-primary col-md-6" >Confirm</button>
                        <button type="button" className="btn btn-secondary col-md-6" >Delete</button>
                    </div>
                </div>
            </div>
            <hr className="card-divider"/>
        </div>
    );
}
export default FriendRequest;