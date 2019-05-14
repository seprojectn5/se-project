import React from 'react';
import classes from './Order.css';



const order = (props) => {
    const info = [];
    for(let infoType in props.info) {
        info.push({
            type: infoType,
            value: props.info[infoType]
        })
    }

    let infoOutput = info.map(infoKey => (
            <span
            key={infoKey.type}
            style={{
                textTransform: 'capitalize',
                display: 'block',
                border: '1px solid gray',
                margin: '5px 8px',
                padding: '5px',
                boxSizing: 'border-box',
                boxShadow: '0px 2px 3px gray'
            }}>
                {infoKey.type}: <strong>{infoKey.value}</strong>
            </span>
    ))

    return (
        <div className={classes.Order}  onClick={props.clicked}>
            <p style={{marginBottom: '5px', color: 'red'}}>Info:</p>
            {infoOutput}
        </div>
    )
}

export default order;