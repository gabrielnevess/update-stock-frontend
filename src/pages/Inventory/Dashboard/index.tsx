import React, { memo } from "react";
import clsx from "clsx";
import {
    Grid,
    Paper,
    Box,
    Typography
} from "@material-ui/core";
import useStyles from "./useStyles";
import Stock from "./Stock";
import ProductInputCard from "./ProdutInputCard";
import ProductOutputCard from "./ProductOutputCard";

export interface IFixedHeightPaper {
    fixedHeight: string;
}

interface IDashboard {
    title: string;
}

export const titleStockActual: string = "Estoque Atual";

const Dashboard: React.FC<IDashboard> = (props) => {
    const { title } = props;
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>

            <div className={classes.content}>

                <Box mb={3}>
                    <Typography
                        variant="h4"
                        align="left"
                    >
                        {title}
                    </Typography>
                </Box>

                <Grid container spacing={3}>

                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                            <ProductInputCard fixedHeight={classes.fixedHeight} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className={fixedHeightPaper}>
                            <ProductOutputCard fixedHeight={classes.fixedHeight} />
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Stock title={titleStockActual} />
                    </Grid>

                </Grid>
            </div>

        </div>
    );
}

export default memo(Dashboard);