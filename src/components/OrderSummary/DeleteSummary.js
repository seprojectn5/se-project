import React from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Button from '../UI/Button/Button'

const deleteSummary = (props) => {
    return (
        <Aux>
            <div>
                <h3>This order will be permanently deleted.</h3>
                <h4>Do you really want to delete this ?</h4>
                
            </div>
            <Button btnType='Success' clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType='Danger' clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    )
}

export default deleteSummary;