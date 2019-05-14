import React from 'react';
import classes from './Table.css';


const table = (props) => {
    let img = null;
    switch(props.people) {
        case 4:
            img = require('../../assets/4.jpg');
            break;
        case 6:
            img = require('../../assets/6.jpg');
            break;
        case 2: 
            img = require('../../assets/2.jpg');
            break;
        default:
            img = require('../../assets/2.jpg');
    }
    const statusClasses = [classes.status];
    const statusClass = (props.status) ? classes.booked : classes.available;
    statusClasses.push(statusClass);

    let notAllowed = null;
    if(props.status) {
        notAllowed = {
            cursor: 'not-allowed'
        }
    }

    return (
            <div className={classes.Table} onClick={props.clicked} style={notAllowed}>    
                <img src={img} alt='table' />
                <p className={statusClasses.join(' ')}>{props.id}</p>
            </div> 
    )
}

export default table;