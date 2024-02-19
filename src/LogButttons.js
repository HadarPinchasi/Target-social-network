// JavaScript source code
import './index.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function LogButtons({ write,handleLogin }) {
    return (
        <Link to='/details'>
            <button className='btn btn-primary' id="danger-btn"  name="move">
                Create new account
            </button>
        </Link>
    )
}
export default LogButtons;