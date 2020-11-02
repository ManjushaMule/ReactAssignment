import React from 'react';
import './Header.scss';
import logo from '../../images/logo-spectra.png';
//import Logo from '../../Logo/Logo';


const header = ( props ) => (
    <header className="header">
        <div className="">
            <img src={logo} className="header__logo" alt="logo" />
            {/* <Logo /> */}
        </div>
    </header>
);

export default header;