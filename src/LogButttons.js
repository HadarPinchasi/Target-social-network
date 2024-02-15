// JavaScript source code
// JavaScript source code
// JavaScript source code
import './index.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SignScreen from './SignScreen';

function LogButtons({ write }) {
    return (
        
            
            <div>
                <button class="theme">
                    Log In
                </button>
                <div>new here?</div>
                <Link to='/details'>
                    <button id="danger-btn" name="move">
                        Create new account
                    </button>
                </Link>
                </div>

       
    )
}
export default LogButtons;