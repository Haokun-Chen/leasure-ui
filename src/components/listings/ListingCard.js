import React from 'react';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import houseImg from'../../assets/house01.jpg';

const styles = {
    card: {
      maxWidth: 345,
      margin: '20px'
    },
    media: {
      height: 140,
    },
};

const ListingCard = (props) => {
    const { classes } = props;
    const { listing } = props;

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={houseImg}
                title={listing.title}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {listing.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="h6">
                    $ {listing.rent} / month
                </Typography>
                <Typography component="p">
                    {listing.description}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default withStyles(styles)(ListingCard);