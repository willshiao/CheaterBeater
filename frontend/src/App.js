import React from 'react';
import './App.css';
import Landing from './components/Landing/Landing';
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
      </Switch>
    </Router>
  );
}

export default App;
