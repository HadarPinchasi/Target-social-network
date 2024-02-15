// JavaScript source code
import './index.css';
function LogInfo({ write }) {
    return (
        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
            <label for="floatingInput">{write}</label>
        </div>
    )
}
export default LogInfo;