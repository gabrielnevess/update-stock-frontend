import React, { useState, useEffect, memo } from "react";
import {
	Button,
	Grid,
	CircularProgress,
	Typography,
	Paper,
    Box
} from "@material-ui/core";
import {
	useHistory,
	useParams
} from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import useStyles from "./useStyles";
import {
	Formik,
	Field,
	Form
} from "formik";
import * as Yup from "yup";
import { RestError } from "../../../../interfaces/RestError";
import { inventoryRole } from "../../Sidebar/Menu";
import { getRoleById, saveUpdateRole } from "../../../../services/roleService";
import Input from "../../../../components/Input";

interface RouteParams {
    id: string
}

const CreateEditRole: React.FC = () => {
	const history = useHistory();
	const classes = useStyles();
	const [loading, setLoading] = useState<boolean>(false);
	const { id } = useParams<RouteParams>();

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(5, "nome da permissão deve ter no minímo 5 caracteres")
			.max(50, "nome da permissão deve ter no máximo 50 caracteres")
			.nullable(false)
            .required("nome da permissão é obrigatório")
	});

	const initialRole = {
		id: "",
		name: ""
	};

	const [currentRole, setCurrentRole] = useState(initialRole);

	const getRole = async (id: number) => {
		setLoading(true);
		const data = await getRoleById(id);
		setLoading(false);
		if (data) {
			setCurrentRole(data);
		}
	}

	useEffect(() => {
		if (id) {
			getRole(parseInt(id));
		}
	}, [id]);

	const renderTitle = id ? "Atualizar Permissão" : "Cadastrar Permissão";
	const renderButtonText = id ? "Atualizar" : "Salvar";

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
                                    {renderTitle}
                                </Typography>
                            </Box>

							<Formik
								enableReinitialize={true}
								initialValues={currentRole}
								validationSchema={validationSchema}
								onSubmit={async (values, { setSubmitting, setFieldError }) => {
									try {
										setSubmitting(true);
										const object = {
											...values
										};

										const data = await saveUpdateRole(object, values.id ? "put" : "post");
										setSubmitting(false);
										if (data) {
											history.push(inventoryRole);
											toast.success("Permissão salva com sucesso!");
										}
									} catch (error) {
										setSubmitting(false);
                                		error?.map((el: RestError, key: number) => setFieldError(el.field, el.details));
									}
								}}>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleBlur,
									handleSubmit,
									isSubmitting
								}) => {
									return (
										<Form className={classes.form}
											noValidate
											onSubmit={handleSubmit}>

											<Grid container spacing={2}>

												<Grid item>
													<Typography color="error" variant="subtitle2">
														* Campo(s) obrigatório(s)
													</Typography>
												</Grid>
												
												<Grid item xs={12}>
													<Field
														component={Input}
														autoComplete="name"
														name="name"
														variant="outlined"
														required
														fullWidth
														id="name"
														label="Permissão"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values?.name}
														helperText={errors.name && touched.name ? errors.name : ""}
														error={errors.name && touched.name}
													/>
												</Grid>
												
											</Grid>

											{isSubmitting ?
												<div className={classes.centered}>
													<CircularProgress />
												</div> :
												<Button
													name="submit"
													type="submit"
													fullWidth
													variant="contained"
													color="primary"
													className={classes.submit}>
													{renderButtonText}
												</Button>
											}
										</Form>
									)
								}}
							</Formik>

						</React.Fragment>
					}
				</Paper>
			</div>
		</React.Fragment>
	);
}

export default memo(CreateEditRole);