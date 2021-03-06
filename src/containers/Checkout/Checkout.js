import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

  checkoutCancelledHandler =  () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler =  () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render () {
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary 
            ingredients={this.props.ings} 
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route 
            path={this.props.match.url + '/contact-data'}
            component={ContactData} 
          />
        </div>
      );
    }
    return summary;    
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
    //these are the state values coming from the redux reducer file that are being distributed to this component
  };
};

export default connect(mapStateToProps)(Checkout);