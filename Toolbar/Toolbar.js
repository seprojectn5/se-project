import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggleButton from '../Sidedrawer/DrawToggleButton/DrawToggleButton'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggleButton clicked={props.drawerToggleClicked}/>
        <Logo height='80%'/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
)

export default toolbar;