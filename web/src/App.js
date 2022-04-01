import './App.css';
import { React } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './login';
import PostMessage from './postmessage';
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}>  </Route>
            <Route path="/postmessage" element={<PostMessage />}>  </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
