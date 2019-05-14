import React from 'react';

import classes from './Sidedrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    
    let attachClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachClasses.join(' ')} onClick={props.closed}>
                <Logo height='10%' marginBottom='32px'/>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;