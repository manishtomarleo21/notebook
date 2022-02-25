import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './component/NavBar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import SignUp from './component/SignUp';

function App() {
  return (
    <NoteState>
      <Router>
        <NavBar />
        <Alert message="This is the alert"/>
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </NoteState>

  );
}

export default App;
