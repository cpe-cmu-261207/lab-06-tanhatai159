import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import axios from 'axios';
import Price from './components/Price';
import About from './components/About';

function App() {

  const history_page = () => {
    return (
      <div className='text-center space-y-3 space-x-3'>
        <p className='text-2xl font-semibold'>Select historical range</p>
        <span>From date</span>
        <input type='date' onChange={e => console.log(e.target.value)}></input>
        <span>To date</span>
        <input type='date' onChange={e => console.log(e.target.value)}></input>
        <br />
        <button>Get data</button>
      </div>
    )
  }

  return (
    <Router>
        <Navbar/>
      <Switch>
        <Route path='/'>
          <Price/>
        </Route>

        {/* template for /current */}
        <Route path='/current'>

        </Route>

        {/* template for /history/select */}
        <Route path='/history/select'>
          {history_page()}
        </Route>

        {/* template for /history/result */}
        <Route path="/history/result">
          <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>Historical price</p>
            <p className='text-2xl text-red-500'>There was an error. Please try again later.</p>
            <p className='text-xl font-semibold'> ( From 2021-01-01 To 2021-01-02)</p>
            <ul>
              <li className='text-xl'>2021-01-01 - {(1000000).toLocaleString()} THB</li>
              <li className='text-xl'>2021-01-02 - {(2000000).toLocaleString()} THB</li>
              <li className='text-xl'>2021-01-03 - {(3000000).toLocaleString()} THB</li>
            </ul>
          </div>
        </Route>

        {/* template for about me */}
        <Route path="/about">
          <About/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
