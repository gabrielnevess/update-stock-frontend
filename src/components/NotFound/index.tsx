import React from 'react';
import {
    Grid,
    Typography
} from "@material-ui/core";
import useStyles from "./useStyles";
import notFoundImage from "../../assets/img/error_404.png";

const NotFound: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <img src={notFoundImage} alt="404" className={classes.error404} />
                <Typography variant="h4" className={classes.description}>Página não encontrada!</Typography>
            </Grid>
        </div>
    );
}

export default NotFound;