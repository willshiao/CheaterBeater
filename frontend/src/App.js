import React from 'react';
import './App.css';
import Landing from './components/Landing/Landing';
import Results from './components/Results/Results';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/results' component={Results} />
      </Switch>
    </Router>
  );
}

export default App;
