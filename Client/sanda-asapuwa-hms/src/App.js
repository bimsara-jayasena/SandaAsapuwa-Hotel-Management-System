import React from 'react';
import './App.css';
import Home from './Pages/Home';
import CreateAccount from './Pages/AccoutnCreaction';
import Manager from './Pages/Dashboards/Manager/ManagerDash';
import Rooms from './Pages/Dashboards/Manager/Rooms';
import {Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
     <Routes>
        
       <Route path='/' element={<Manager/>}/>
       <Route path='/Rooms' element={<Rooms/>}/>
     </Routes>
      
    </div>
  );
}

export default App;
