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
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      msg: message
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  return (
    <NoteState>
      <Router>
        <NavBar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert}/>} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login showAlert={showAlert}/>} />
            <Route exact path='/signup' element={<SignUp showAlert={showAlert}/>} />
          </Routes>
        </div>
      </Router>
    </NoteState>

  );
}

export default App;
