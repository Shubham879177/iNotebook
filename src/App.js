import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';



function App() {

  return (
    <>
      <NoteState>
        <Navbar  title = "iNotebook"/>
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>

      </NoteState>
    </>
  );
}

export default App;
