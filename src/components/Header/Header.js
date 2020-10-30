import React from 'react';
import './Header.scss';
import logo from '../../logo.svg';
//import Logo from '../../Logo/Logo';


const header = ( props ) => (
    <header className="header">
        <div className="">
            <img src={logo} className="header__logo" alt="logo" />
            {/* <Logo /> */}
        </div>
        {/* <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav> */}
    </header>
);

export default header;