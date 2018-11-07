import React, { Component } from 'react';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import moment from 'moment';
import { withRouter } from 'react-router-dom';

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            location: "chapel-hill",
            startDate: moment(),
            endDate: moment(),
            focusedInput: null
        }
    }

    handleLocationChange = event => {
        this.setState({ location: event.target.value });
    };

    submitSearch = () => {
        // searching using query string
        this.props.history.push({
            pathname: '/listings',
            search: `?location=${this.state.location}&startDate=${this.state.startDate.format("MM-DD-YYYY")}&endDate=${this.state.endDate.format("MM-DD-YYYY")}`
        });
    }

    render() {
        return(
            <div>
                <InputLabel htmlFor="location-simple">Location</InputLabel>
                <Select
                    value={this.state.location}
                    onChange={this.handleLocationChange}
                    inputProps={{
                    name: 'location',
                    id: 'location-simple',
                    }}
                >
                    <MenuItem value="chapel-hill">
                        Chapel Hill
                    </MenuItem>
                    <MenuItem value="raleigh">
                        Raleigh
                    </MenuItem>
                </Select>

                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
                <button onClick={this.submitSearch}> Search </button>
            </div>
        )
    };
}

export default withRouter(Landing);