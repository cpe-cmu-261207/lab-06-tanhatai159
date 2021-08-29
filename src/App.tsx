import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Price from './components/Price';
import About from './components/About';
import Select from './components/history/Select';
import Result from './components/history/Result';

function App() {

  return (
    <Router>

        <Navbar/>

      <Switch>

        <Route path='/' exact>
          <Price/>
        </Route>

 
        <Route path='/current'>
          <Price/>
        </Route>


        <Route path='/history/select'>
          <Select/>
        </Route>


        <Route path="/history/result">
          <Result/>
        </Route>


        <Route path="/about">
          <About/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
