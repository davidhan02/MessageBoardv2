import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';

import { fetchUser } from '../actions/authActions';
import PrivateRoute from './common/PrivateRoute';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Login from './auth/Login';
import Register from './auth/Register';

const About = () => <h2>About</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const Landing = () => <h2>Landing</h2>;
const NotFound = () => <h2>404 Not Found</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Header />
          <Container>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </Container>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { fetchUser }
)(App);
