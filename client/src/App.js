import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";

// Component
import Content from './components/Content';
import Header from './components/Header';
import Footer from './components/Footer';

// Page
import Addpage from './components/pages/Addpage';
// import postaxios from './components/functions/postaxios'

function App() {
  return(
    <div className='appdiv'>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Content/>}/>
          <Route path='/addnc' element={<Addpage/>}/>
          {/* <Route path='/post' element={<postaxios/>}/> */}
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App;
