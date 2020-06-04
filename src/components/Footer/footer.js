import React from 'react';
import {Link} from 'react-router-dom';

import './footer.css';

import {CURRENT_YEAR} from '../helpers'

const Footer =()=>(
    <div className='footer'>
        <Link to='/'>
        <img alt="nba logo" src="/images/nba_logo.png" className="logo-footer"/>
        </Link>
        <div className='right'>
 NBA {CURRENT_YEAR} All Rights Reserved
        </div>
    </div>
)

export default Footer;