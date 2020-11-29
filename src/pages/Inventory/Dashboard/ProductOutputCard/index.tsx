import React, { memo, useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import {
    Typography,
    CircularProgress
} from "@material-ui/core";
import useStyles from "./useStyles";
import { getQtdProductOutput } from "../../../../services/dashboardService";
import { IFixedHeightPaper } from "../../Dashboard";

interface InitialProductOutput {
    qtdProductOutput: number;
    date: string;
}

const ProductOutputCard: React.FC<IFixedHeightPaper> = (props) => {

    const initialQtdProductOutput: InitialProductOutput = {
        qtdProductOutput: 0,
        date: "--/----"
    };

    const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(false);
    const [monthlyQtdProductOutput, setQtdProductOutput] = useState<InitialProductOutput>(initialQtdProductOutput);

    const getData = useCallback(async () => {
        setLoading(true);
        const data = await getQtdProductOutput();
        if (data) {
            setQtdProductOutput(data);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <React.Fragment>
            {loading ?
                <div className={clsx(classes.centered, props.fixedHeight)}>
                    <CircularProgress />
                </div> :
                <React.Fragment>
                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                        Qtd. de Saídas de Produtos (Mês)
                    </Typography>
                    <Typography component="p" variant="h4">
                        {monthlyQtdProductOutput?.qtdProductOutput}
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                        de {monthlyQtdProductOutput?.date}
                    </Typography>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default memo(ProductOutputCard);