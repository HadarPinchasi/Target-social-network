// JavaScript source code
import LeftLogo from './LeftLogo';
import RightScreen from './RightScreen';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function LogIn() {
    return (
        < div className="container text-center" >
            <div className="row">
                <LeftLogo description='Connect with your friends' comments='' />
                <RightScreen />
            </div>
        </div >
    );
}
export default LogIn;