import React, {Component} from 'react';
import AuthService from '../../services/AuthService';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            confirmpass: '',
        };

        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthService();
    }

    handleFirstnameChange (event) {
        this.setState({firstname: event.target.value});
    };

    handleSubmit () {
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <label>
                    First Name:
                    <input type="text" value={this.state.firstname} onChange={this.handleFirstnameChange} />
                </label>
                <label>
                    Email:
                    <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <label>
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange}  />
                </label>
                <input type="submit" value="Register" />
                </form>
            </div>
        );
    }
}

export default Signup