import React, { useState, useEffect, useCallback, memo } from "react";
import {
	Button,
	CircularProgress,
	Typography,
	Paper,
    Box,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox
} from "@material-ui/core";
import {
	useHistory,
	useParams
} from "react-router-dom";
// import { toast } from "react-toastify";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useStyles from "./useStyles";
import { getRolesByUserId, getRoles } from "../../../../services/userRoleService";
import { Role } from "../../../../interfaces/Role";

interface RouteParams {
    id: string
}

const CreateEditUserRole: React.FC = () => {
	const history = useHistory();
	const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(false);
    //const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [checked, setChecked] = React.useState<Role[]>([] as Role[]);
    const [left, setLeft] = React.useState<Role[]>([] as Role[]);
    const [right, setRight] = React.useState<Role[]>([] as Role[]);
	const { id } = useParams<RouteParams>();

    const getData = useCallback(async (id: number) => {
        setLoading(true);
        const data = await getRoles();
        if(data) {
            getDataRolesByUserId(id, data);
        } else {
            setLoading(false);
        }
    }, []);

	const getDataRolesByUserId = async (id: number, left: Role[]) => {
		const data = await getRolesByUserId(id);
        setLoading(false);
        if (data) {
            if (left.length !== 0) {
                const rightFiltered = data?.map((el: Role) => el.id);
                const filtered = left.filter(r => !rightFiltered.includes(r.id));
                setLeft(filtered);
                setRight(data)
            } else {
                setRight(data);
            }
        }

    }
    
	useEffect(() => {
		if (id) {
			getData(parseInt(id));
		}
	}, [getData, id]);
    
    const not = (a: Role[], b: Role[]) => {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    const intersection = (a: Role[], b: Role[]) => {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: Role) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const customList = (items: Role[]) => (
        <Paper className={classes.paperTransferList}>
            <List dense component="div" role="list">
                {items.map((value: Role) => {
                    const labelId = `transfer-list-item-${value?.id}-label`;

                    return (
                        <ListItem key={value?.id} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value?.name} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

	return (
		<React.Fragment>
			<div className={classes.layout}>
				<Paper className={classes.paper}>

					{loading ?
						<div className={classes.centered}>
							<CircularProgress />
						</div> :

						<React.Fragment>

							<Button
								color="primary"
								onClick={() => history.goBack()}>
								<ArrowBackIcon />
									Voltar
							</Button>

                            <Box mb={3}>
                                <Typography
                                    variant="h5"
                                    align="center"
                                >
                                    Cadastrar/Atualizar permissões do usuário
                                </Typography>
                            </Box>

                            <Grid 
                                className={classes.root}
                                container 
                                justify="center" 
                                alignItems="center"
                                spacing={1}
                            >
                                <Grid item>{customList(left)}</Grid>
                                <Grid item>
                                    <Grid container direction="column" alignItems="center">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleAllRight}
                                            disabled={left.length === 0}
                                            aria-label="move all right"
                                        >
                                            ≫
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleCheckedRight}
                                            disabled={leftChecked.length === 0}
                                            aria-label="move selected right"
                                        >
                                            &gt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleCheckedLeft}
                                            disabled={rightChecked.length === 0}
                                            aria-label="move selected left"
                                        >
                                            &lt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleAllLeft}
                                            disabled={right.length === 0}
                                            aria-label="move all left"
                                        >
                                            ≪
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>{customList(right)}</Grid>
                            </Grid>
							
                            {/*  {submitLoading ?
                                <div className={classes.centered}>
                                    <CircularProgress />
                                </div> :
                                <Button
                                    name="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    Salvar
                                </Button>
                            } */}

						</React.Fragment>
					}
				</Paper>
			</div>
		</React.Fragment>
	);
}

export default memo(CreateEditUserRole);