import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Button from '../UI/Button/Button'

const orderSummary = (props) => {
    const customerInfo = Object.keys(props.info).map((infoKey) => {
        return(
            <li key={infoKey}>
                <span style={{textTransform: 'capitalize'}}>{infoKey}</span>: {props.info[infoKey].value}
            </li>
        )
    })
    return (
        <Aux>
            <h3>Your Information</h3>
            <ul>
                {customerInfo}
            </ul>
            <p>Continue to choose table?</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
}

export default orderSummary;