import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios';

function App() {

  type bitcoin = {
    time: {
      updated: string;
    }
    bpi: {
      THB: {
        rate: string;
        code: string;
      }
    }
  }

  const [loading, setloading] = useState(false);
  const [coin, setCoin] = useState<bitcoin | null>(null);

  const price_page = () => {
    if (loading) {
      return (
        <p className='text-2xl'>Loading ...</p>
      )
    }
    else if (loading === false) {
      return (
        <div className='text-center space-y-3'>
          <p className='text-2xl font-semibold'>Current price</p>
          <p className='text-2xl'> {coin?.bpi.THB.rate} THB</p>
          <p> (Last updated {coin?.time.updated}) </p>
        </div>
      )
    }
  }

  const history_page = () => {
    if (loading) {
      return (
        <p className='text-2xl'>Loading ...</p>
      )
    }
    else if (loading === false) {
      return (
        <div className='text-center space-y-3'>
          <p className='text-2xl font-semibold'>Current price</p>
          <p className='text-2xl'> {coin?.bpi.THB.rate} THB</p>
          <p> (Last updated {coin?.time.updated}) </p>
        </div>
      )
    }
  }

  useEffect(() => {
    setloading(true)
    axios.get<bitcoin>("https://api.coindesk.com/v1/bpi/currentprice/thb.json")
      .then(resp => {
        setCoin(resp.data);
        setloading(false);
      })
      .catch(err => console.log(err));
    axios.get("https://api.coindesk.com/v1/bpi/historical/close.json?currency=THB")
      .then(resp => resp.data)
      .catch(err => console.log(err));
  }, [])

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/">
          {price_page()}
        </Route>

        {/* template for /current */}

        <Route path="/current">
          {price_page()}
        </Route>

        {/* template for /history/select */}
        <Route path="/history/select">
          <div className='text-center space-y-3 space-x-3'>
            <p className='text-2xl font-semibold'>Select historical range</p>
            <span>From date</span>
            <input type='date' onChange={e => console.log(e.target.value)}></input>
            <span>To date</span>
            <input type='date' onChange={e => console.log(e.target.value)}></input>
            <br />
            <button>Get data</button>
          </div>
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
          <div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>About me</p>
            <p className='text-xl'>Tanhatai Klungmajareon 630610732</p>
          </div>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
