import React, { Component } from "react";
import { connect } from 'react-redux';

import Order from '../../components/Order/Order/Order';
import withErrodHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
 
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId)
  }

  render () {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order 
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
        />
      ));
    }

    return(
      <div>
       {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.authorization.token,
    userId: state.authorization.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrodHandler(Orders, axios));