import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <div className={classes.NavigationItems}>
        <NavigationItem link='/' active exact>Contact Data</NavigationItem>
        {
            props.isAuthenticated
            ? <NavigationItem link='/chooseTable'>Tables</NavigationItem>
            : null
        }
            
        {
            props.isAuthenticated 
            ? <NavigationItem link='/orders'>Orders</NavigationItem>
            : null
        }   
        {
            props.isAuthenticated 
            ? <NavigationItem link='/logout'>Log Out</NavigationItem> 
            : <NavigationItem link='/admin'>Manager</NavigationItem>
        }
        </div>
    )
}

export default navigationItems;