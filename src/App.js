import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/noteState';


function App() {

  return (
    <>
      <NoteState>
        <Navbar  title = "iNotebook"/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

      </NoteState>
    </>
  );
}

export default App;
