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
import { inventoryProduct } from "../../Sidebar/RoutesAdmin";
import { getProductById, saveUpdateProduct } from "../../../../services/productService";
import Input from "../../../../components/Input";

interface RouteParams {
    id: string
}

const CreateEditProduct: React.FC = () => {
	const history = useHistory();
	const classes = useStyles();
	const [loading, setLoading] = useState<boolean>(false);
	const { id } = useParams<RouteParams>();

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(5, "nome do produto deve ter no minímo 5 caracteres")
			.max(255, "nome do produto deve ter no máximo 255 caracteres")
			.nullable(false)
            .required("nome do produto é obrigatório"),
        model: Yup.string()
			.min(5, "modelo deve ter no minímo 5 caracteres")
			.max(255, "modelo deve ter no máximo 255 caracteres")
			.nullable(false)
            .required("modelo é obrigatório"),
        serial: Yup.string()
			.min(5, "serial deve ter no minímo 5 caracteres")
			.max(255, "serial deve ter no máximo 255 caracteres")
			.nullable(false)
            .required("serial é obrigatório")
	});

	const initialProduct = {
		id: "",
		brand: {
			id: ""
		},
		measurementUnit: {
			id: ""
		},
        name: "",
		model: "",
		serial: ""
	};

	const [currentProduct, setCurrentProduct] = useState(initialProduct);

	const getProduct = async (id: number) => {
		setLoading(true);
		const data = await getProductById(id);
		setLoading(false);
		if (data) {
			setCurrentProduct(data);
		}
	}

	useEffect(() => {
		if (id) {
			getProduct(parseInt(id));
		}
	}, [id]);

	const renderTitle = id ? "Atualizar Produto" : "Cadastrar Produto";
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
								initialValues={currentProduct}
								validationSchema={validationSchema}
								onSubmit={async (values, { setSubmitting, setFieldError }) => {
									try {
										setSubmitting(true);
										const object = {
											...values
										};

										const data = await saveUpdateProduct(object, values.id ? "put" : "post");
										setSubmitting(false);
										if (data) {
											history.push(inventoryProduct);
											toast.success("Produto salvo com sucesso!");
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
														label="Nome do produto"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values?.name}
														helperText={errors.name && touched.name ? errors.name : ""}
														error={errors.name && touched.name}
													/>
												</Grid>

												<Grid item xs={12}>
													<Field
														component={Input}
														autoComplete="model"
														name="model"
														variant="outlined"
														required
														fullWidth
														id="model"
														label="Modelo"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values?.model}
														helperText={errors.model && touched.model ? errors.model : ""}
														error={errors.model && touched.model}
													/>
												</Grid>

												<Grid item xs={12}>
													<Field
														component={Input}
														autoComplete="serial"
														name="serial"
														variant="outlined"
														required
														fullWidth
														id="serial"
														label="Serial"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values?.serial}
														helperText={errors.serial && touched.serial ? errors.serial : ""}
														error={errors.serial && touched.serial}
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

export default memo(CreateEditProduct);