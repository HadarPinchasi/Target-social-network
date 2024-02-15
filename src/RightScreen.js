// JavaScript source code
import './index.css';
import LogButtons from './LogButttons';
import LogInfo from './LogInfo';
function RightScreen() {
    return (
        <div class="col-lg-7 col-s-1 loginScreen">
            <LogInfo write='Email address' />
            <LogInfo write='Password' />
            <LogButtons/>
        </div>
    )
}
export default RightScreen;