import React, {Component} from 'react';
import moment from 'moment';
import queryString from 'query-string'
import { withStyles } from '@material-ui/core/styles';

import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import ListingsService from '../../services/ListingsService';
import ListingCard from './ListingCard';

const styles = {
    cardGroup: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    queryInput: {
        margin: '20px'
    }
};

class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'chapel-hill',
            startDate: moment().startOf('day'),
            endDate: moment().add(5, 'M').startOf('day'),

            focusedInput: null,
            listings: []
        }
        this.listingsService = new ListingsService();
    }

    handleDateChange = (startDate, endDate) => {
        if (startDate && endDate) {
            this.listingsService.get(this.state.location, startDate, endDate)
            .then(res => {
                this.setState({listings: res.data})
                console.log(res.data);
            });
        }
        this.setState({startDate, endDate});
    }

    handleLocationChange = event => {
        this.setState({ location: event.target.value });
    };

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);

        let location = this.state.location;
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;

        if (values && values.location) {
            // check location in a set with given values
            if (values.location === 'chapel-hill' || values.location === 'raleigh'){
                location = values.location;
            }
        }
        if (values && values.startDate) {
            const date = parseDate(values.startDate);
            if (startDate) {
                startDate = date;
            }
        }
        if (values && values.endDate) {
            const date = parseDate(values.endDate);
            if (endDate) {
                endDate = date;
            }
        }

        this.setState({location, startDate, endDate});

        this.listingsService.get(location, startDate, endDate)
        .then(res => {
            this.setState({listings: res.data})
            console.log(res.data);
        });
    }

    render() {
        const { classes } = this.props;

        return(
            <div>
                <InputLabel className={classes.queryInput} htmlFor="location-simple">Location: </InputLabel>
                <Select
                    value={this.state.location}
                    onChange={this.handleLocationChange}
                    inputProps={{
                    name: 'location',
                    id: 'location-list',
                    }}
                >
                    <MenuItem value="chapel-hill">
                        Chapel Hill
                    </MenuItem>
                    <MenuItem value="raleigh">
                        Raleigh
                    </MenuItem>
                </Select>
                <InputLabel htmlFor="availability" className={classes.queryInput}>Sublease date:</InputLabel>
                <DateRangePicker 
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.handleDateChange(startDate, endDate)} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
                <div className={classes.cardGroup}>{this.state.listings.map((listing) => {
                    return <ListingCard listing={listing} key={listing._id}></ListingCard>
                })}</div>
            </div>
        );
    }
}

export default withStyles(styles)(Listings);

// helper function
const parseDate = (dateString) => {
    const date = moment(dateString, "MM-DD-YYYY", "en", true);

    if (date.isValid()) {
        return date.startOf('day');
    } else {
        return false;
    }
};