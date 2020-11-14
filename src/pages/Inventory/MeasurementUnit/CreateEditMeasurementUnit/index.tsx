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
import { inventoryMeasurementUnit } from "../../Sidebar/RoutesAdmin";
import { getMeasurementUnitById, saveUpdateMeasurementUnit } from "../../../../services/measurementUnitService";
import Input from "../../../../components/Input";

interface RouteParams {
    id: string
}

const CreateEditMeasurementUnit: React.FC = () => {
	const history = useHistory();
	const classes = useStyles();
	const [loading, setLoading] = useState<boolean>(false);
	const { id } = useParams<RouteParams>();

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(3, "nome da unidade de medida deve ter no minímo 3 caracteres")
			.max(50, "nome da unidade de medida deve ter no máximo 50 caracteres")
			.nullable(false)
            .required("nome da unidade de medida é obrigatório"),
        prefix: Yup.string()
			.min(3, "prefixo deve ter no minímo 3 caracteres")
			.max(50, "prefixo deve ter no máximo 50 caracteres")
			.nullable(false)
            .required("prefixo é obrigatório")
	});

	const initialMeasurementUnit = {
		id: "",
        name: "",
        prefix: ""
	};

	const [currentMeasurementUnit, setCurrentMeasurementUnit] = useState(initialMeasurementUnit);

	const getMeasurementUnit = async (id: number) => {
		setLoading(true);
		const data = await getMeasurementUnitById(id);
		setLoading(false);
		if (data) {
			setCurrentMeasurementUnit(data);
		}
	}

	useEffect(() => {
		if (id) {
			getMeasurementUnit(parseInt(id));
		}
	}, [id]);

	const renderTitle = id ? "Atualizar Unidade" : "Cadastrar Unidade";
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
								initialValues={currentMeasurementUnit}
								validationSchema={validationSchema}
								onSubmit={async (values, { setSubmitting, setFieldError }) => {
									try {
										setSubmitting(true);
										const object = {
											...values
										};

										const data = await saveUpdateMeasurementUnit(object, values.id ? "put" : "post");
										setSubmitting(false);
										if (data) {
											history.push(inventoryMeasurementUnit);
											toast.success("Unidade salva com sucesso!");
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
														label="Nome da unidade de medida"
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
														autoComplete="prefix"
														name="prefix"
														variant="outlined"
														required
														fullWidth
														id="prefix"
														label="Prefixo"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values?.prefix}
														helperText={errors.prefix && touched.prefix ? errors.prefix : ""}
														error={errors.prefix && touched.prefix}
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

export default memo(CreateEditMeasurementUnit);