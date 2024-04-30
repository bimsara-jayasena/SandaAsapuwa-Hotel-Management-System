import React from 'react';
import './App.css';

import Home from './Pages/Home';
import CreateAccount from './Pages/AccoutnCreaction';
import Manager from './Pages/Dashboards/Manager/ManagerDash';
import Rooms from './Pages/Dashboards/Manager/Rooms';
import Staff from './Pages/Dashboards/Manager/Staff';
import Bookings from './Pages/Dashboards/Manager/Bookings';
import Settings from './Pages/Dashboards/Manager/Settings';
import {Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from './Pages/test';


function App() {
  return (
    <div className="App">
     <Routes>
       {/* <Route path='/' element={<Staff/>}/> */}
       <Route path='/' element={<Staff/>}/>
       <Route path='/New Account' element={<CreateAccount/>}/>
       <Route path='/Manager/:id' element={<Manager/>}/>
       <Route path='/Rooms/:id' element={<Rooms/>}/>
       <Route path='/Staff/:id' element={<Staff/>}/>
       <Route path='/Booking/:id' element={<Bookings/>}/>
       <Route path='/Settings/:id' element={<Settings/>}/>
     </Routes>
      
    </div>
  );
}

export default App;
