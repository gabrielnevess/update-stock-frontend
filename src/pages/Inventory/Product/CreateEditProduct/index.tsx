import React, { useState, useEffect, memo } from "react";
import {
	Button,
	Grid,
	CircularProgress,
	Typography,
	Paper,
	Box,
	FormControl,
	Select,
	InputLabel,
	FormHelperText
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
	Form,
	FormikErrors,
	FormikTouched,
	getIn
} from "formik";
import * as Yup from "yup";
import { RestError } from "../../../../interfaces/RestError";
import { inventoryProduct } from "../../Sidebar/Menu";
import { getProductById, saveUpdateProduct } from "../../../../services/productService";
import Input from "../../../../components/Input";
import { Brand } from "../../../../interfaces/Brand";
import { Pageable } from "../../../../interfaces/Pageable";
import { getBrands } from "../../../../services/brandService";
import { MeasurementUnit } from "../../../../interfaces/MeasurementUnit";
import { getMeasurementUnits } from "../../../../services/measurementUnitService";
import { Product } from "../../../../interfaces/Product";

interface RouteParams {
    id: string
}

const CreateEditProduct: React.FC = () => {
	const history = useHistory();
	const classes = useStyles();
	const [loading, setLoading] = useState<boolean>(false);
	const [brands, setBrands] = useState<Pageable<Brand>>({} as Pageable<Brand>);
	const [measurementUnits, setMeasurementUnits] = useState<Pageable<MeasurementUnit>>({} as Pageable<MeasurementUnit>);
	const { id } = useParams<RouteParams>();

	const validationSchema = Yup.object().shape({
		brand: Yup.object().shape({ 
			id: Yup.number()
				.nullable(false)
				.required("marca é obrigatório")
				.test("brand-match", "obrigatório selecionar uma marca", function(value: any): any {
					if (value) {
						return value !== -1;
					}
				}),
		}),
		measurementUnit: Yup.object().shape({ 
			id: Yup.number()
				.nullable(false)
				.required("unidade de medida é obrigatório")
				.test("measurementUnit-match", "obrigatório selecionar uma unidade de medida", function(value: any): any {
					if (value) {
						return value !== -1;
					}
				}),
		}),
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

	const isValueValid = (errors: FormikErrors<Product>, touched: FormikTouched<Product>, key: string) => {
        return getIn(errors, key) && getIn(touched, key);
    }

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

	const getAllBrands = async () => {
		const data = await getBrands();
		setBrands(data);
	}
	
	useEffect(() => {
		getAllBrands();
	}, []);

	const getAllMeasurementUnits = async () => {
		const data = await getMeasurementUnits();
		setMeasurementUnits(data);
	}
	
	useEffect(() => {
		getAllMeasurementUnits();
	}, []);

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

												<Grid item>
													<Typography color="error" variant="subtitle2">
														* Campo(s) obrigatório(s)
													</Typography>
												</Grid>

												<Grid item xs={12} md={6}>
													<FormControl
														variant="outlined"
														required
														error={isValueValid(errors, touched, "brand.id") ? true : false}
														className={classes.formControl}
														disabled={loading}
													>
														<InputLabel id="brand.id">Marca</InputLabel>
														<Field
															component={Select}
															labelId="brand.id"
															id="brand.id"
															native
															onChange={handleChange}
															value={values?.brand?.id}
															inputProps={{
																id: "brand.id"
															}}
															label="Marca *"
														>
															<option value={-1}>Selecione uma marca</option>
															{brands?.content?.map((el: Brand, key: number) => (
																<option key={key} value={el.id}>{el.name}</option>
															))}
														</Field>
															{isValueValid(errors, touched, "brand.id") ? <FormHelperText>{errors?.brand?.id}</FormHelperText> : ""}
													</FormControl>
												</Grid>

												<Grid item xs={12} md={6}>
													<FormControl
														variant="outlined"
														required
														error={isValueValid(errors, touched, "measurementUnit.id") ? true : false}
														className={classes.formControl}
														disabled={loading}
													>
														<InputLabel id="measurementUnit.id">Unidade de medida</InputLabel>
														<Field
															component={Select}
															labelId="measurementUnit.id"
															id="measurementUnit.id"
															native
															onChange={handleChange}
															value={values?.measurementUnit?.id}
															inputProps={{
																id: "measurementUnit.id"
															}}
															label="Unidade de medida *"
														>
															<option value={-1}>Selecione uma unidade de medida</option>
															{measurementUnits?.content?.map((el: MeasurementUnit, key: number) => (
																<option key={key} value={el.id}>{el.prefix}</option>
															))}
														</Field>
														{isValueValid(errors, touched, "measurementUnit.id") ? <FormHelperText>{errors?.measurementUnit?.id}</FormHelperText> : ""}
													</FormControl>
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