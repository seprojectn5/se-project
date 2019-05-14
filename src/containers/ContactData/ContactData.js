import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';


class ContactData extends Component {
    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Addess'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            time: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Time'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            people: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'People'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        booking: false,
        loading: false
    }

    purchaseHandler = () => {
        this.setState({
            booking: true
        })
    }

    purchaseCancel = () => {
        this.setState({
            booking: false
        })
    }

    purchaseContinue = (event) => {
        event.preventDefault();
        const queryParams = [];
            for(let i in this.state.orderForm) {
                if(i === 'name') {
                    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.orderForm[i].value));
                }
            }
            const queryString = queryParams.join('&');
            
        this.setState({
            loading: true
        })
        const formData = {};
        for(let identifier in this.state.orderForm) {
            formData[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            orderData: formData
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                })
                this.props.history.push({
                    pathname: '/chooseTable',
                    search: '?' + queryString
                })
            })
            .catch(error => {
                this.setState({
                    loading: false,
                })
            })
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = (value.trim() !== '' && isValid);
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    inputChangedHandler = (event, identifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[identifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[identifier] = updatedFormElement;

        let formIsValid = true;
        for(let identifier in updatedOrderForm) {
            formIsValid = (updatedOrderForm[identifier].valid && formIsValid);
        } 
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
        
    }

    render() {
        const orderFormElement = [];
        for(let key in this.state.orderForm) {
            orderFormElement.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <div>
                <form>
                    {orderFormElement.map(element => {
                    return <Input 
                            key={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.value}
                            invalid={!element.config.valid}
                            touched={element.config.touched}
                            changed={(event) => this.inputChangedHandler(event, element.id)}></Input>
                    })}        
                </form>
                {<Button btnType='Normal' disabled={!this.state.formIsValid} clicked={this.purchaseHandler}>ORDER</Button>}
            </div>
            
        )
      
        const img = require('../../assets/reservation-bg.png');

        let orderSummary = <OrderSummary info={this.state.orderForm}
                                         purchaseCancelled={this.purchaseCancel}
                                         purchaseContinued={this.purchaseContinue}/>

        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return (
            <Aux>
                <Modal show={this.state.booking} clicked={this.purchaseCancel}>
                    {orderSummary}
                </Modal>
                <div className={classes.ContactData} style ={ { backgroundImage: "url("+img+")" } }>
                    <h4>Enter your contact data</h4>
                    {form}
                </div>
            </Aux>
        )
    }
}



export default ContactData;