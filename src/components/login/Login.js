import React, {Component} from 'react';
import AuthService from '../../services/AuthService';
import { Link } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthService();
    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
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
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <label>
                    Password:
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange}  />
                </label>
                <input type="submit" value="Login" />
            </form>
            <button><Link to='/signup'>Sign Up</Link></button>
        </div>
        );
    }
}

export default Login;