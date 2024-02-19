import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Feed from './Feed';
import LogIn from './LogIn';
import Registration from './Registration';
/*function App() {
    return (
        <Feed/>
    );
}
export default App;*/


function App() {
    return (
                <BrowserRouter>
                    <Routes>
                <Route path="/" element={<LogIn />}> </Route>
                <Route path="/details" element={<Registration />}> </Route>
                <Route path="/feed" element={<Feed />}> </Route>
                    </Routes>
                </BrowserRouter>
    );
}
export default App;


