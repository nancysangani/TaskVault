import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar.jsx';
import Tasks from './components/Tasks.jsx';
import AddTask from './components/AddTask.jsx';
import UpdateTask from './components/UpdateTask.jsx';
import SignUp from './components/SignUp.jsx';
import LogIn from './components/Login.jsx';
import Protected from './components/Protected.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Protected><Tasks /></Protected>} />
        <Route path="/add-task" element={<Protected><AddTask /></Protected>} />
        <Route path="/update-task/:id" element={<Protected><UpdateTask /></Protected>} />
        <Route path="/log-out" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;