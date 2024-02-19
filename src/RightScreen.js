import './index.css';
import LogButtons from './LogButttons';
import LogInfo from './LogInfo';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function RightScreen() {
    const handleLogin = () => {
        const usernameInput = document.getElementById('usernameInput');
        const passwordInput = document.getElementById('passwordInput');
        if (usernameInput && passwordInput && usernameInput.value === 'HadarIsTired8' && passwordInput.value === 'MR654321') {
            window.location.href = '/feed';
        } else {
            alert('Wrong username or password');
        }
    };

    return (
        <div className="col-lg-7 col-s-1 loginScreen" id='openingScreen'>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="usernameInput"></input>
                <label htmlFor="usernameInput">User name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="passwordInput"></input>
                <label htmlFor="passwordInput">Password</label>
            </div>
            <div>
                <button className ='btn btn-primary' id='startButton' onClick={handleLogin}>
                    Log In
                </button>
                <div>new here?</div>
                <LogButtons/>
            </div>
        </div>
    );
}

export default RightScreen;
