import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Feed from './Feed';
import LogIn from './LogIn';
import Registration from './Registration';
import Article from './Article';
import Post from './Post';
import PersonalData from './PersonalData';
function App() {
    return (
                <BrowserRouter>
                    <Routes>
                <Route path="/" element={<LogIn />}> </Route>
                <Route path="/details" element={<Registration />}> </Route>
                <Route path="/feed" element={<Feed />}> </Route>
                <Route path="/personalData" element={<PersonalData />}> </Route>

                    </Routes>
                </BrowserRouter>
    );
}
export default App; 


