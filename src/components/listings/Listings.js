import React, {Component} from 'react';
import moment from 'moment';

import queryString from 'query-string'

class Listings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            querys: {
                location: 'chapel-hill',
                checkin: moment().startOf('day'),
                checkout: moment().add(5, 'M').startOf('day')
            }
        }
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search);

        if (values && values.location) {
            // check location in a set with given values
            if (location == 'chapel-hill'){
                this.setState(prevState => ({
                    querys: {
                        ...prevState.querys,
                        location: values.location
                    }
                }))
            }
        }
        if (values && values.checkin) {
            const checkinDate = parseDate(values.checkin);

            if (checkinDate) {
                this.setState(prevState => ({
                    querys: {
                        ...prevState.querys,
                        checkin: checkinDate
                    }
                }))
            }
        }
        if (values && values.checkout) {
            const checkoutDate = parseDate(values.checkout);
            if (checkoutDate) {
                this.setState(prevState => ({
                    querys: {
                        ...prevState.querys,
                        checkout: checkoutDate
                    }
                }))
            }
        }
    }

    render() {
        return(
            <div>Listings</div>
        );
    }
}

export default Listings;

// helper function
const parseDate = (dateString) => {
    const date = moment(dateString, "MM-DD-YYYY", "en", true);

    if (date.isValid()) {
        return date.startOf('day');
    } else {
        return false;
    }
};