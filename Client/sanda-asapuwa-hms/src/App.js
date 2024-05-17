import React from 'react';
import './App.css';

import Home from './Pages/Home';
import AddNewBooking from './Pages/AddNewBooking';
import CreateAccount from './Pages/AccoutnCreaction';
import Manager from './Pages/Dashboards/Manager/ManagerDash';
import Reception from './Pages/Dashboards/Reception/ReceptDash';
import Rooms from './Pages/Dashboards/Manager/Rooms';
import Staff from './Pages/Dashboards/Manager/Staff';
import Bookings from './Pages/Dashboards/Manager/Bookings';
import Settings from './Pages/Dashboards/Manager/Settings';

import BookingsR from './Pages/Dashboards/Reception/BookingsR';
import StaffR from './Pages/Dashboards/Reception/StaffR';
import RoomsR from './Pages/Dashboards/Reception/RoomsR';
import SettingsR from './Pages/Dashboards/Reception/SettingsR';
import {Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Income from './Pages/Dashboards/Reception/Income';
;



function App() {
  return (
    <div className="App">
     <Routes>
       {/* <Route path='/' element={<Staff/>}/> */}
       <Route path='/' element={<Home/>}/>
       <Route path='/New Account' element={<CreateAccount/>}/>
       <Route path='/Manager/:id' element={<Manager/>}/>
       <Route path='/Reception/:id' element={<Reception/>}/>
       <Route path='/Rooms/:id' element={<Rooms/>}/>
       <Route path='/Staff/:id' element={<Staff/>}/>
       <Route path='/Booking/:id' element={<Bookings/>}/>
       <Route path='/Settings/:id' element={<Settings/>}/>
       {/*  */}
       <Route path='/Rooms-r/:id' element={<RoomsR/>}/>
       <Route path='/Staff-r/:id' element={<StaffR/>}/>
       <Route path='/Booking-r/:id' element={<BookingsR/>}/>
       <Route path='/Income-r/:id' element={<Income/>}/>
       <Route path='/Settings-r/:id' element={<SettingsR/>}/>
      <Route path='/AddNewBooking/:id' element={<AddNewBooking/>}/>
     </Routes>
      
    </div>
  );
}

export default App;
