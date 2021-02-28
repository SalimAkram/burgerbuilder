import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }
  
  toggleHandler = () => {
    this.setState(( prevState ) => {
      return { showSideDrawer: !this.state.showSideDrawer };
    });
  }

  render () {
    return (
      <Aux>
        <Toolbar 
          isAuthenticated={this.props.isAuthenticated}
          toggle={this.toggleHandler}  
        />
        <SideDrawer 
          isAuthenticated={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  };
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authorization.token !== null
  };
};

export default connect(mapStateToProps)(Layout);