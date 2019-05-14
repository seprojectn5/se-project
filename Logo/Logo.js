import React from 'react';

import classes from './Logo.css';
import cheerLogo from '../../assets/cheers.png';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height, marginBottom: props.marginBottom}}>
        <img src={cheerLogo} alt="Cheers Logo"></img>
    </div>
)

export default logo;