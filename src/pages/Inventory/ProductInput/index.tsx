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
	Tooltip,
	Fab
} from "@material-ui/core";
import moment from "moment";
import "moment/locale/pt-br";
import { getProductInputs } from "../../../services/productInputService";
import useStyles from "./useStyles";
import { ProductInput } from "../../../interfaces/ProductInput";
import { Pageable } from "../../../interfaces/Pageable";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import { inventoryProductInputC } from "../Sidebar/Menu";
import { 
	isPermissionValid, 
	ROLE_CADASTRAR_ENTRADA_PRODUTO 
} from "../Sidebar/Menu/permissions";
import { useAuth } from "../../../hooks/auth";

interface IViewProductInput {
	title: string;
}

const ViewProductInput: React.FC<IViewProductInput> = (props) => {
	const { title } = props;
	const classes = useStyles();
	const history = useHistory();
	const { logged } = useAuth();
	const [pageable, setPageable] = useState<Pageable<ProductInput>>({} as Pageable<ProductInput>);
	const [loading, setLoading] = useState<boolean>(false);

	// paginação
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);

	const getData = async (page: number, rowsPerPage: number) => {
		setLoading(true);
		const data = await getProductInputs(page, rowsPerPage);
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

	const handleClickAddProductInput = () => {
		history.push(inventoryProductInputC);
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
                                        <TableCell align="left">Qtd. entrada de produtos</TableCell>
										<TableCell align="left">Responsável</TableCell>
										<TableCell align="left">Data da entrada</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{(pageable?.content && pageable.content?.length !== 0) ?
										pageable?.content?.map((row, index) => (
											<TableRow key={index}>
												<TableCell align="left">{row.id}</TableCell>
                                                <TableCell align="left">{row?.product?.name} - {row?.product?.model}</TableCell>
                                                <TableCell align="left">{row.qtd}</TableCell>
												<TableCell align="left">{row.user?.name}</TableCell>
												<TableCell align="left">{moment(row.createdAt).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
											</TableRow>
										)) :
										<TableRow>
											<TableCell align="center" colSpan={5}>
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
						{
							isPermissionValid(logged?.roles, ROLE_CADASTRAR_ENTRADA_PRODUTO) &&
							<Tooltip title="Adicionar Entrada de Produto">
								<Fab
									name="adicionar-entrada"
									color="secondary"
									aria-label="add"
									className={classes.fab}
									onClick={handleClickAddProductInput}>
									<AddIcon />
								</Fab>
							</Tooltip>
						}
					</React.Fragment>
				}

			</div>

		</div>
	);
}

export default memo(ViewProductInput);