import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authorization from './containers/Authorization/Authorization';
import Logout from './containers/Authorization/Logout/Logout';
import * as actions from './store/actions/index'

class App extends Component {

componentDidMount () {
  this.props.onAutoLogIn();
};

  render () {
    let routes = (
      <Switch>
        <Route path="/authorization" component={Authorization} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }  
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authorization.token !== null
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onAutoLogIn: () => dispatch(actions.authorizationCheckState())
  };
};

export default withRouter((connect(mapStateToProps, mapDispatchToProps))(App));
