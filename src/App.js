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

function App() {
  return (
    <div className="App">
      <NoteState>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />   
        </Routes>
      </Router>
      </NoteState>

    </div>
  );
}

export default App;
