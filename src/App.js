
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import FormPage from './Components/FormPage';
import FormData from './Components/FormData';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<FormPage/>} />
            <Route path='/data' element={<FormData/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
