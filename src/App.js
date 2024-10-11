import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
   <Router>
     <>
        <Header/>
        <Main/>
     </>
   </Router>
  );
}

export default App;
