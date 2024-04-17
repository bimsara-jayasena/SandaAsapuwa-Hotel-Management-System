import React from 'react';
import './App.css';
import Home from './Pages/Home';
import CreateAccount from './Pages/AccoutnCreaction';
import {Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
     <Routes>
        
       <Route path='/' element={<Home/>}/>
       <Route path='/New Account' element={<CreateAccount/>}/>
     </Routes>
    </div>
  );
}

export default App;
