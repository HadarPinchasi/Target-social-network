// JavaScript source code
import { FaFacebook } from "react-icons/fa";
import {  Link } from 'react-router-dom';
import TopScreenIcons from "./TopScreenIcons";

function TopScreen({ profilePic }) {

    function toggleMode() {
        const body = document.body;
        body.classList.toggle('dark-mode');

    }
    return (
        <nav className="navbar fixed-top bg-body-tertiary shadow p-3 d-none d-lg-block ">
            <div className="container ">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="d-flex align-items-center">
                                <FaFacebook className="col-3" style={{ fontSize: '2.5rem', color: 'blue' }} />
                                <input className="form-control me-2 col-9" type="search" placeholder="Search Facebook" aria-label="Search" style={{ width: "10rem" }} />
                            </div>
                        </div>

                    </div>
                    <div className="col-6">
                        <TopScreenIcons/>

                    </div>
                    <div className="col d-flex justify-content-end">
                        <Link to='/'>
                            <button className="rounded-circle border-0" style={{ width: '45px', height: '45px', fontSize: '8px', backgroundColor:'lightgrey', color:'black' }}>
                                Log Out
                            </button>
                        </Link>
                        <div>
                            <button onClick={toggleMode} className="rounded-circle border-0" style={{ width: '45px', height: '45px', fontSize: '8px', backgroundColor: 'lightgrey', color: 'black' }}>Change Mode</button>
                        </div>                          
                        <img src={profilePic} className="rounded-circle" style={{ width: '45px', height: '45px', marginRight: '10px' }} height='100%' alt="" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default TopScreen;
