import React from 'react';
import classes from './DrawToggleButton.css';

const drawerToggleButton = (props) => {
    return (
        <div onClick={props.clicked} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default drawerToggleButton;