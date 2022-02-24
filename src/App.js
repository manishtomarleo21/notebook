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
          </Routes>
        </div>
      </Router>
    </NoteState>

  );
}

export default App;
