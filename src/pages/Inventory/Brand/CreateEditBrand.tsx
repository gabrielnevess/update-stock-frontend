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
import { RestError } from "../../../interfaces/RestError";
import { inventoryBrand } from "../Sidebar/RoutesAdmin";
import { getBrandById, saveUpdateBrand } from "../../../services/brandService";
import Input from "../../../components/Input";

interface RouteParams {
    id: string
}

const CreateEditBrand: React.FC = () => {
	const history = useHistory();
	const classes = useStyles();
	const [loading, setLoading] = useState<boolean>(false);
	const { id } = useParams<RouteParams>();

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(3, "marca deve ter no minímo 5 caracteres")
			.max(50, "marca deve ter no máximo 50 caracteres")
			.nullable(false)
            .required("marca é obrigatório")
	});

	const initialBrand = {
		id: "",
		name: ""
	};

	const [currentBrand, setCurrentBrand] = useState(initialBrand);

	const getBrand = async (id: number) => {
		setLoading(true);
		const data = await getBrandById(id);
		setLoading(false);
		if (data) {
			setCurrentBrand(data);
		}
	}

	useEffect(() => {
		if (id) {
			getBrand(parseInt(id));
		}
	}, [id]);

	const renderTitle = id ? "Atualizar Marca" : "Cadastrar Marca";
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
								initialValues={currentBrand}
								validationSchema={validationSchema}
								onSubmit={async (values, { setSubmitting, setFieldError }) => {
									try {
										setSubmitting(true);
										const object = {
											...values
										};

										const data = await saveUpdateBrand(object, values.id ? "put" : "post");
										setSubmitting(false);
										if (data) {
											history.push(inventoryBrand);
											toast.success("Marca salva com sucesso!");
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

												<Grid item xs={12} sm={12}>
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
														label="Marca"
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

export default memo(CreateEditBrand);