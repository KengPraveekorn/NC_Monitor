import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes } from "react-router-dom";

// Component
import Content from './components/Content';
import Header from './components/Header';
import Footer from './components/Footer';

// Page
import Addpage from './components/pages/Addpage';
import TPagination from './components/pages/TPagination';
import MindPaginate from './components/functions/MindPaginate';

function App() {
  return(
    <div className='appdiv'>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Content/>}/>
          <Route path='/addnc' element={<Addpage/>}/>
          <Route path='/paginate' element={<TPagination/>}/>
          <Route path='/pgnt' element={<MindPaginate/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  )
}

export default App;
