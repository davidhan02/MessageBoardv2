import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';

import PrivateRoute from './common/PrivateRoute';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './dashboard/Dashboard';
import CreateProfile from './create-profile/CreateProfile';

const About = () => <h2>About</h2>;
const Landing = () => <h2>Landing</h2>;
const NotFound = () => <h2>404 Not Found</h2>;

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-prof" component={CreateProfile} />
            <Route component={NotFound} />
          </Switch>
        </Container>
        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
