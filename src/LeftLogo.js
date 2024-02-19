// JavaScript source code
import './index.css';
function LeftLogo({description,comments }) {
    return (
        <div className="col-lg-5 col-s-2" id='openingScreen'>
            <ul className=" logo">
                <li>  FooBook </li>
                <li> {description}</li>
                <li> {comments}</li>
            </ul>
        </div>
    )
}
export default LeftLogo;