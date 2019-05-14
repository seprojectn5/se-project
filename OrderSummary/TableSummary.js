import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Button from '../UI/Button/Button'

const tableSummary = (props) => {
    return (
        <Aux>
            <h3>Do you want to choose this table ?</h3>
            <p>Table number <strong>{props.tableId}</strong></p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
}

export default tableSummary;