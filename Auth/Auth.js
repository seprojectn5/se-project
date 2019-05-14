import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if(this.props.authPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }
    
    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required) {
            isValid = (value.trim() !== '' && isValid);
        }
        if(rules.minLength) {
            isValid = (value.length >= rules.minLength && isValid);
        }
        if(rules.maxLength) {
            isValid = (value.length <= rules.maxLength && isValid);
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({
            controls: updatedControls
        })
    }

    signUpHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    submitFormHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render() {
        const orderFormElement = [];
        for(let key in this.state.controls) {
            orderFormElement.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = orderFormElement.map(element => {
            return <Input 
                            key={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.value}
                            invalid={!element.config.valid}
                            shouldElementInvalid={element.config.validation}
                            touched={element.config.touched}
                            changed={(event) => this.inputChangedHandler(event, element.id)}/>
                
        })

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = <p style={{color: 'white', fontWeight: 'bolder'}}>{this.props.error.message}</p>
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authPath}/>
        }

        const img = require('../../assets/loginImage.jpeg');
        return (
            <div className={classes.Auth} style={{backgroundImage: "url("+img+")"}}>
                {authRedirect}
                <form onSubmit={this.submitFormHandler} style={{marginTop: '80px'}}>
                    {errorMessage}
                    {form}
                    <Button btnType='LogIn'>Submit</Button>
                </form>
                <Button btnType='Swicth' clicked={this.signUpHandler}>Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authPath: state.auth.authPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);