import './App.css';
import LeftLogo from './LeftLogo';
import RightScreen from './RightScreen';
import SignInfo from './SignInfo';
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
/*-----*/
import infos from './infos';
import infosList from './infosList';
import SignScreen from './SignScreen';
/*---------*/
import Feed from './Feed';
function App() {
    return (
        <Feed/>
    );
}
export default App;

/*
function App() {
    return (
        < div class="container text-center" >
            <div class="row">
                <LeftLogo description='Connect with your friends' comments='' />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<RightScreen />}> </Route>
                        <Route path="/details" element={<SignScreen />}> </Route>
                    </Routes>
                </BrowserRouter>

            </div>
        </div >
    );
}
export default App;

*/
