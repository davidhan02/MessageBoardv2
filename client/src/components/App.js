import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import React, { Fragment } from 'react';
import Container from 'react-bootstrap/Container';

import PrivateRoute from './common/PrivateRoute';
import AddExperience from './credentials/AddExperience';
import AddEducation from './credentials/AddEducation';
import EditProfile from './profile/edit/EditProfile';
import ShowProfile from './profile/display/ShowProfile';
import Dashboard from './dashboard/Dashboard';
import Register from './auth/Register';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Login from './auth/Login';

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
            <Route exact path="/user/:userId" component={ShowProfile} />
            <Route exact path="/handle/:handle" component={ShowProfile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/edit-prof" component={EditProfile} />
            <PrivateRoute exact path="/add-exp" component={AddExperience} />
            <PrivateRoute path="/edit-exp/:expId" component={AddExperience} />
            <PrivateRoute exact path="/add-edu" component={AddEducation} />
            <PrivateRoute path="/edit-edu/:eduId" component={AddEducation} />
            <Route component={NotFound} />
          </Switch>
        </Container>
        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
