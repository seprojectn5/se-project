import React, { Component } from 'react';
import ContactData from './containers/ContactData/ContactData';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import Layout from '../src/components/Layout/Layout';
import Orders from '../src/containers/Orders/Orders';
import Tables from '../src/containers/Tables/Tables';
import Auth from '../src/containers/Auth/Auth';
import Logout from '../src/containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/admin' component={Auth} />
        <Route path='/' exact component={ContactData} />
        <Route path='/chooseTable' component={Tables} />
        <Redirect to='/' />
      </Switch>
    )
    
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/chooseTable' component={Tables} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/admin' component={Auth} />
          <Route path='/' exact component={ContactData} />
          <Redirect to='/' />
        </Switch>
      )
    }
    return (
      <Layout>
        {routes}
      </Layout> 
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
