import React, { Component } from "react";
import { withRouter } from "react-router-dom";


import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Salim Akram",
        address: {
          street: "36 My House Street",
          city: "Brighton",
          state: 'MA',
          zipCode: '43215',

        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  }

  render () {
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
        <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
        <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
        <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code"/>
      <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData)