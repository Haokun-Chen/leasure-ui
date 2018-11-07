import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.scss';
// materui-ui
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import { withStyles, withTheme } from '@material-ui/core/styles';
// services
import AuthService from '../../services/AuthService';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      background: 'none',
      border: 'none',
      margin: '5px',
      color: 'white'
    },
    link: {
        color: 'white'
    },
    profileName: {
        'margin-left': '30px'
    }
  });

class Header extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
        this.Auth = new AuthService();
    }

    componentDidMount() {
        if(this.Auth.loggedIn()) {
            this.setState({isLoggedIn: true});
        }
    }

    logout = () => {
        this.Auth.logout();
        window.location.reload(); 
    }

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <button className={classes.button}><Link className={classes.link} to='/listings'>Search Listings</Link></button>
                    <button className={classes.button}><Link className={classes.link} to='/post'>Post Your Room</Link></button>
                    {!this.state.isLoggedIn && <button className={classes.button}><Link className={classes.link} to='/login'>Login</Link></button> }
                    {this.state.isLoggedIn && <button className={classes.button} onClick={this.logout}>Logout</button> }
                    {this.state.isLoggedIn && <div className={classes.profileName}> Hello!  {this.Auth.getProfile().firstName}</div>}
                </Toolbar>
            </AppBar> 
        )
    }
}

export default withStyles(styles)(Header);