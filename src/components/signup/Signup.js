import React, {Component} from 'react';

import AuthService from '../../services/AuthService';

import MaskedInput from 'react-text-mask';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

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

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
        };

        this.Auth = new AuthService();
    }

    componentWillMount() {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/listings');
        }
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    handleSubmit = (event)  => {
        event.preventDefault();
        const phone = this.state.phone.substring(1, 4) + this.state.phone.substring(6, 9) + this.state.phone.substring(10, 14);

        this.Auth.signup(this.state.firstname, this.state.lastname, this.state.email, this.state.password, phone).then((res) => {
            window.location.reload(); 
            this.props.history.replace('/listings');
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        const { classes } = this.props;

        return(
            <div>
                <form onSubmit={this.handleSubmit} className={classes.container}>
                    <TextField
                    id="signUpFirstName"
                    label="First name"
                    className={classes.textField}
                    value={this.state.firstname}
                    onChange={this.handleChange('firstname')}
                    margin="normal"
                    />
                    <TextField
                    id="signUpLastName"
                    label="Last name"
                    className={classes.textField}
                    value={this.state.lastname}
                    onChange={this.handleChange('lastname')}
                    margin="normal"
                    />
                    <TextField
                        id="loginEmail"
                        label="Email"
                        className={classes.textField}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                    />
                    <TextField
                        id="loginPassword"
                        label="Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="signUpPhone" shrink={true}>Phone No.</InputLabel>
                        <Input
                            value={this.state.phone}
                            onChange={this.handleChange('phone')}
                            id="signUpPhone"
                            inputComponent={TextMaskCustom}
                        />
                    </FormControl>
                <Button variant="contained" color="default" type="submit" className={classes.button}> Register </Button>
                </form>
            </div>
        );
    }
}

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

export default withStyles(styles)(Signup);