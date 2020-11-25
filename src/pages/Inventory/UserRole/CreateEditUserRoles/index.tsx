import React, { useState, useEffect, memo } from "react";
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
import { toast } from "react-toastify";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useStyles from "./useStyles";
import { getTransferList, saveTransferList } from "../../../../services/userRoleService";
import { IUserRoles } from "../../../../interfaces/IUserRoles";
import { inventoryUserRole } from "../../Sidebar/Menu";

interface RouteParams {
    id: string
}

interface IData {
    left: IUserRoles[];
    right: IUserRoles[];
}

const CreateEditUserRole: React.FC = () => {
	const history = useHistory();
	const classes = useStyles();
    const [loading, setLoading] = useState<boolean>(false);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [checked, setChecked] = React.useState<IUserRoles[]>([] as IUserRoles[]);
    const [left, setLeft] = React.useState<IUserRoles[]>([] as IUserRoles[]);
    const [right, setRight] = React.useState<IUserRoles[]>([] as IUserRoles[]);
	const { id } = useParams<RouteParams>();

    const getData = async (id: number) => {
        setLoading(true);
        const data: IData = await getTransferList(id);
        setLeft(data?.left || []);
        setRight(data?.right || []);
        setLoading(false);
    }
    
	useEffect(() => {
		if (id) {
			getData(parseInt(id));
		}
	}, [id]);
    
    const not = (a: IUserRoles[], b: IUserRoles[]) => {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    const intersection = (a: IUserRoles[], b: IUserRoles[]) => {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: IUserRoles) => () => {
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
        setRight(right?.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right?.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left?.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left?.concat(right));
        setRight([]);
    };

    const customList = (items: IUserRoles[]) => (
        <Paper className={classes.paperTransferList}>
            <List dense component="div" role="list">
                {items?.map((value: IUserRoles) => {
                    const labelId = `transfer-list-item-${value?.roleId}-label`;

                    return (
                        <ListItem key={value?.roleId} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value?.roleName} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    const handleSubmit = async () => {
        try {
            setSubmitLoading(true);
            const object = {
                left: left,
                right: right
            }
            const data = await saveTransferList(object);
            setSubmitLoading(false);
            if(data) {
                toast.success("Alteração feita com sucesso!");
                history.push(inventoryUserRole);
            }
        } catch(ex) {
            setSubmitLoading(false);
        }
    }

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
                                    Cadastro de permissões do usuário
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
                                            disabled={left?.length === 0}
                                            aria-label="move all right"
                                        >
                                            ≫
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleCheckedRight}
                                            disabled={leftChecked?.length === 0}
                                            aria-label="move selected right"
                                        >
                                            &gt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleCheckedLeft}
                                            disabled={rightChecked?.length === 0}
                                            aria-label="move selected left"
                                        >
                                            &lt;
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            className={classes.button}
                                            onClick={handleAllLeft}
                                            disabled={right?.length === 0}
                                            aria-label="move all left"
                                        >
                                            ≪
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>{customList(right)}</Grid>
                            </Grid>
							
                            {submitLoading ?
                                <div className={classes.centered}>
                                    <CircularProgress />
                                </div> :
                                <Button
                                    name="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={left?.length === 0 && right?.length === 0}
                                    onClick={() => handleSubmit()}
                                >
                                    Salvar
                                </Button>
                            }

						</React.Fragment>
					}
				</Paper>
			</div>
		</React.Fragment>
	);
}

export default memo(CreateEditUserRole);