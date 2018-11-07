import React, {Component} from 'react';
import AuthService from '../../services/AuthService';
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import queryString from 'query-string'


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },

    button: {
        margin: '35px 5px'
    }
  });


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            postError: false
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthService();
    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/listings');
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        if (values && values.postError) {
            alert("You have to login first to post a listing");
        }
    }

    handleEmailChange (event) {
        this.setState({email: event.target.value});
    };

    handlePasswordChange (event) {
        this.setState({password: event.target.value});
    };

    handleSubmit(event) {
        event.preventDefault();
        
        this.Auth.login(this.state.email, this.state.password)
            .then(res =>{
               window.location.reload(); 
               this.props.history.replace('/listings');
            })
            .catch(err =>{
                // console.log(err);
                alert(err);
            })
    }

    render() {
        const { classes } = this.props;

        return (
        <div>
            <form onSubmit={this.handleSubmit} className={classes.container}>
                <TextField
                    id="loginEmail"
                    label="Email"
                    className={classes.textField}
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                />
                <TextField
                    id="loginPassword"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    margin="normal"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                />
                <Button variant="contained" color="default" type="submit" className={classes.button}> Login </Button>
                <Button variant="contained" color="default" className={classes.button}> <Link to='/signup'>Sign Up</Link> </Button>
            </form>
        </div>
        );
    }
}
export default withStyles(styles)(Login);