// JavaScript source code
import './feed.css';

function MenuObject({ object,descripton,color}) {
    return (
          
        <li class="list-group-item w-100 m-2"><span className="object m-2" style={{ color:  color  }} >{object}</span> {descripton}</li>
            
    );
}
export default MenuObject;