import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import HomePage from './HomePage';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RegistrationForm} />
        <Route path="/home" component={HomePage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
