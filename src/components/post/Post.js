import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import moment from 'moment';

import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import ListingsService from '../../services/ListingsService';

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
  });

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            rooms: 1,
            baths: 1,
            bathType: "private",
            description: "",
            rent: 600,
            startDate: null,
            endDate: null
        };
        this.Auth = new AuthService();
        this.listingsService = new ListingsService();
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    componentWillMount(){
        if(!this.Auth.loggedIn())
            this.props.history.replace('/login?postError=true');
    }

    handleDateChange = (startDate, endDate) => {
        this.setState({startDate, endDate});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.listingsService.post(this.Auth.getToken(), this.state.title, parseInt(this.state.rooms), parseInt(this.state.baths), this.state.bathType, parseInt(this.state.rent), this.state.description, this.state.startDate, this.state.endDate)
        .then(res => {
            this.props.history.replace('/listings');
        }).catch(err => {
            alert(err);
        })
    }

    render() {
        const { classes } = this.props;

        return (
        <div>
            <h4>Tell us about your wonderful room!</h4>
            <form onSubmit={this.handleSubmit} className={classes.container}>
                <TextField
                id="postFormTitle"
                label="Title:"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange('title')}
                margin="normal"
                />
                <TextField
                    id="postFormRoom"
                    label="Rooms:"
                    value={this.state.rooms}
                    onChange={this.handleChange('rooms')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <TextField
                    id="postFormBath"
                    label="Baths:"
                    value={this.state.baths}
                    onChange={this.handleChange('baths')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <FormControl margin="normal">
                <InputLabel htmlFor="bathType-list">BathType</InputLabel>
                <Select
                    value={this.state.bathType}
                    onChange={this.handleChange('bathType')}
                    inputProps={{
                    name: 'bathType',
                    id: 'bathType-list',
                    }}
                >
                    <MenuItem value="private">
                        Private
                    </MenuItem>
                    <MenuItem value="shared">
                        Shared
                    </MenuItem>
                </Select>
                </FormControl>
                <TextField
                    id="postFormRent"
                    label="Monthly Rent:"
                    value={this.state.rent}
                    onChange={this.handleChange('rent')}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                 <TextField
                    id="postFormDescription"
                    label="Description: "
                    multiline
                    onChange={this.handleChange('description')}
                    rowsMax="4"
                    placeholder="Tell us your beautiful room!"
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    id="date"
                    label="Available From:"
                    type="date"
                    defaultValue={this.state.startDate}
                    className={classes.textField}
                    onChange={this.handleChange('startDate')}
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField
                    id="date"
                    label="Available Until:"
                    type="date"
                    defaultValue={this.state.endDate}
                    className={classes.textField}
                    onChange={this.handleChange('endDate')}
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <Button variant="contained" color="primary" type="submit"> Post </Button>
            </form>
        </div>
        );
    }
}

export default withStyles(styles)(Post);