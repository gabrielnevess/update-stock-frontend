import React, { useEffect, useState, memo } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	CircularProgress,
	Typography,
	TablePagination,
	Box,
	//Tooltip
} from "@material-ui/core";
import moment from "moment";
import "moment/locale/pt-br";
import { getStocks, deleteStock } from "../../../services/stockService";
import useStyles from "./useStyles";
import { Stock } from "../../../interfaces/Stock";
import { Pageable } from "../../../interfaces/Pageable";
//import { useHistory } from "react-router-dom";
// import DeleteIcon from "@material-ui/icons/Delete";
//import { useAuth } from "../../../hooks/auth";
// import { 
// 	isPermissionValid, 
// 	ROLE_REMOVER_PERMISSAO
// } from "../Sidebar/Menu/permissions";

interface IViewStock {
	title: string;
}

const ViewStock: React.FC<IViewStock> = (props) => {
	const { title } = props;
	const classes = useStyles();
	//const history = useHistory();
	// const { logged } = useAuth();
	const [pageable, setPageable] = useState<Pageable<Stock>>({} as Pageable<Stock>);
	const [loading, setLoading] = useState<boolean>(false);

	// paginação
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);

	const getData = async (page: number, rowsPerPage: number) => {
		setLoading(true);
		const data = await getStocks(page, rowsPerPage);
		setPageable(data);
		setLoading(false);
	}

	useEffect(() => {
		getData(page, rowsPerPage);
	}, [page, rowsPerPage]);

	// método para mudar página
	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
		setPage(page);
	}

	// método para mudar quantidade de linhas por página
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	const handleClickDeleteStock = async (id: number) => {
		setLoading(true);
		await deleteStock(id);
		getData(page, rowsPerPage);
	}

	return (
		<div className={classes.root}>

			<div className={classes.content}>

				<Box mb={3}>
					<Typography
						variant="h5"
						align="left"
					>
						{title}
					</Typography>
				</Box>

				{loading ?
					<div className={classes.centered}>
						<CircularProgress />
					</div> :
					<React.Fragment>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell align="left">Código</TableCell>
										<TableCell align="left">Produto</TableCell>
										<TableCell align="left">Qtd.</TableCell>
										<TableCell align="left">Data do cadastro</TableCell>
										<TableCell align="left">Última atualização</TableCell>
										<TableCell />
									</TableRow>
								</TableHead>
								<TableBody>
									{(pageable?.content && pageable.content?.length !== 0) ?
										pageable?.content?.map((row, index) => (
											<TableRow key={index}>
												<TableCell align="left">{row.id}</TableCell>
												<TableCell align="left">{row.product?.name} - {row.product?.model}</TableCell>
												<TableCell align="left">{row.qtd}</TableCell>
												<TableCell align="left">{moment(row.createdAt).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
												<TableCell align="left">{moment(row.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
												{/* <TableCell align="left">
													{
														isPermissionValid(logged?.stocks, ROLE_REMOVER_PERMISSAO) &&
														<Tooltip title="Deletar Permissão">
															<IconButton
																id={`deletar-${row?.id}`}
																aria-label="delete"
																className={classes.marginIcon}
																onClick={() => handleClickDeleteStock(row?.id)}>
																<DeleteIcon />
															</IconButton>
														</Tooltip>
													}
												</TableCell> */}
											</TableRow>
										)) :
										<TableRow>
											<TableCell align="center" colSpan={6}>
												<Typography variant="subtitle1">Nenhum Registro encontrado!</Typography>
											</TableCell>
										</TableRow>
									}
								</TableBody>
							</Table>
							<TablePagination
								labelRowsPerPage={"Qtd de itens"}
								rowsPerPageOptions={[5, 10, 25]}
								component="div"
								count={pageable?.totalElements || 0}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
							/>
						</TableContainer>
					</React.Fragment>
				}

			</div>

		</div>
	);
}

export default memo(ViewStock);