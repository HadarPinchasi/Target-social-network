import './index.css';
import LogButtons from './LogButttons';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

function RightScreen() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    const handleLogin = async () => {
        try {
            const data = {
                userName: document.getElementById('usernameInput').value,
                password: document.getElementById('passwordInput').value
            }
            const res = await fetch('http://localhost:12345/api/tokens', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (res.status === 404) {
                alert('Wrong username or password');
            } else if (res.ok) {
                const json = await res.json()
                setToken(json.token);
                navigate('/feed', { state: { token: json.token, username: data.userName } });

            } else {
                throw new Error('Server response was not ok.');
            }
        } catch (error) {
            console.error('Error sending data to server:', error);
            // Handle error
        }
    }




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
                <button className='btn btn-primary' id='startButton' onClick={handleLogin}>
                    Log In
                </button>
                <div>new here?</div>
                <LogButtons />
            </div>
        </div>
    );
}

export default RightScreen;