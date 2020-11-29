import React, { memo, useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import {
    Typography,
    CircularProgress
} from "@material-ui/core";
import useStyles from "./useStyles";
import { getQtdProductInput } from "../../../../services/dashboardService";
import { IFixedHeightPaper } from "../../Dashboard";

interface InitialProductInput {
    qtdProductInput: number;
    date: string;
}

const ProductInputCard: React.FC<IFixedHeightPaper> = (props) => {

    const initialQtdProductInput: InitialProductInput = {
        qtdProductInput: 0,
        date: "--/----"
    };

    const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(false);
    const [monthlyQtdProductInput, setQtdProductInput] = useState<InitialProductInput>(initialQtdProductInput);

    const getData = useCallback(async () => {
        setLoading(true);
        const data = await getQtdProductInput();
        if (data) {
            setQtdProductInput(data);
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
                        Qtd. de Entradas de Produtos (Mês)
                    </Typography>
                    <Typography component="p" variant="h4">
                        {monthlyQtdProductInput?.qtdProductInput}
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                        de {monthlyQtdProductInput?.date}
                    </Typography>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default memo(ProductInputCard);