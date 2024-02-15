// JavaScript source code
import './index.css';
function LeftLogo({description,comments }) {
    return (
        <div class="col-lg-5 col-s-2">
            <ul class=" logo">
                <li>  FooBar </li>
                <li> {description}</li>
                <li> {comments}</li>
            </ul>
        </div>
    )
}
export default LeftLogo;