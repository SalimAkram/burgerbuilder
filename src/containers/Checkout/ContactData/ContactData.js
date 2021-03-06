import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        htmlType: 'input',
        htmlConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        htmlType: 'input',
        htmlConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      city: {
        htmlType: 'input',
        htmlConfig: {
          type: 'text',
          placeholder: 'City'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      state: {
        htmlType: 'input',
        htmlConfig: {
          type: 'text',
          placeholder: 'State'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        htmlType: 'input',
        htmlConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      email: {
        htmlType: 'input',
        htmlConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        htmlType: 'select',
        htmlConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let htmlInputIdentifier in this.state.orderForm) {
      formData[htmlInputIdentifier] =  this.state.orderForm[htmlInputIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }
    this.props.onPurchase(order, this.props.token);
  }

  inputChangedHandler = (event, htmlInputIdentifier) => {
    const updatedFormElement = updateObject(this.state.orderForm[htmlInputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[htmlInputIdentifier].validation),
      touched: true 
    });
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [htmlInputIdentifier]: updatedFormElement
    }) 

    let formIsValid = true;
    for (let htmlInputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[htmlInputIdentifier].valid && formIsValid
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    //updatedFormElement represents the deep cloned orderForm object
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key] // this is the new single object from the order form that is being .map() over below on line 172
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            htmlType={formElement.config.htmlType}
            htmlConfig={formElement.config.htmlConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.props.loading) {
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

const mapStateToProps =  state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.authorization.token,
    userId: state.authorization.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchase: (orderData, token) => dispatch(actions.purchase(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));