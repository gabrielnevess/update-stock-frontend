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
	Fab,
	IconButton
} from "@material-ui/core";
import moment from "moment";
import "moment/locale/pt-br";
import { getBrands, deleteBrand } from "../../../services/brandService";
import useStyles from "./useStyles";
import { Brand } from "../../../interfaces/Brand";
import { Pageable } from "../../../interfaces/Pageable";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { inventoryBrandCe } from "../Sidebar/Menu";
import { useAuth } from "../../../hooks/auth";
import { 
	isPermissionValid, 
	ROLE_CADASTRAR_MARCA,
	ROLE_REMOVER_MARCA
} from "../Sidebar/Menu/permissions";

interface IViewBrand {
	title: string;
}

const ViewBrand: React.FC<IViewBrand> = (props) => {
	const { title } = props;
	const classes = useStyles();
	const history = useHistory();
	const { logged } = useAuth();
	const [pageable, setPageable] = useState<Pageable<Brand>>({} as Pageable<Brand>);
	const [loading, setLoading] = useState<boolean>(false);

	// paginação
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(5);

	const getData = async (page: number, rowsPerPage: number) => {
		setLoading(true);
		const data = await getBrands(page, rowsPerPage);
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

	const handleClickEditBrand = (id: number) => {
		history.push(`${inventoryBrandCe}/${id}`);
	}

	const handleClickDeleteBrand = async (id: number) => {
		setLoading(true);
		await deleteBrand(id);
		getData(page, rowsPerPage);
	}

	const handleClickAddBrand = () => {
		history.push(inventoryBrandCe);
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
										<TableCell align="left">Nome</TableCell>
										<TableCell align="left">Data do cadastro</TableCell>
										<TableCell align="left">Última atualização</TableCell>
										<TableCell />
										<TableCell />
									</TableRow>
								</TableHead>
								<TableBody>
									{(pageable?.content && pageable.content?.length !== 0) ?
										pageable?.content?.map((row, index) => (
											<TableRow key={index}>
												<TableCell align="left">{row.id}</TableCell>
												<TableCell align="left">{row.name}</TableCell>
												<TableCell align="left">{moment(row.createdAt).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
												<TableCell align="left">{moment(row.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
												<TableCell align="left">
													{
														isPermissionValid(logged?.roles, ROLE_CADASTRAR_MARCA) &&
														<Tooltip title="Editar Marca">
															<IconButton
																id={`editar-${row?.id}`}
																aria-label="edit"
																className={classes.marginIcon}
																onClick={() => handleClickEditBrand(row?.id)}>
																<EditIcon />
															</IconButton>
														</Tooltip>
													}
												</TableCell>
												<TableCell align="left">
													{
														isPermissionValid(logged?.roles, ROLE_REMOVER_MARCA) &&
														<Tooltip title="Deletar Marca">
															<IconButton
																id={`deletar-${row?.id}`}
																aria-label="delete"
																className={classes.marginIcon}
																onClick={() => handleClickDeleteBrand(row?.id)}>
																<DeleteIcon />
															</IconButton>
														</Tooltip>
													}
												</TableCell>
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
						{
							isPermissionValid(logged?.roles, ROLE_CADASTRAR_MARCA) &&
							<Tooltip title="Adicionar Marca">
								<Fab
									name="adicionar-marca"
									color="secondary"
									aria-label="add"
									className={classes.fab}
									onClick={handleClickAddBrand}>
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

export default memo(ViewBrand);