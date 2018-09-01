import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.scss';
// materui-ui
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// services

class Header extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <button><Link to='/listings'>Search Listings</Link></button>
                    <button><Link to='/login'>Login</Link></button>
                </Toolbar>
            </AppBar> 
        )
    }
}

export default Header;