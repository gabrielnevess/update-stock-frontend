import React, { useState, useEffect, memo } from "react";
import {
	Button,
	Grid,
	CircularProgress,
	Typography,
	Paper,
	Box,
	InputAdornment,
	IconButton
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
import { inventoryUser } from "../../Sidebar/Menu";
import { getUserById, saveUpdateUser } from "../../../../services/userService";
import Input from "../../../../components/Input";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface RouteParams {
    id: string
}

const CreateEditUser: React.FC = () => {
	const history = useHistory();
	const classes = useStyles();
	const [loading, setLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { id } = useParams<RouteParams>();

	const validationSchema = Yup.object().shape({
		login: Yup.string()
			.min(5, "login deve ter no minímo 5 caracteres")
			.max(20, "login deve ter no máximo 20 caracteres")
			.nullable(false)
			.required("login é obrigatório")
			.matches(RegExp("^(?!.*([A-Za-z0-9._@])\\1{2})(?=.*[a-z])(?=.*\\d)[A-Za-z0-9._@]+$"), { message: "login dever conter só letras, números . _ e @ | login dever conter no mínimo 1 caracter letra e número e no máximo 2 caracteres iguais" }),
		email: Yup.string()
			.email("email inválido")
			.nullable(false)
			.required("email é obrigatório"),
		password: Yup.string()
			.min(5, "senha deve ter no minímo 5 caracteres")
			.max(255, "senha deve ter no máximo 255 caracteres")
			.nullable(false)
			.required("senha é obrigatório"),
		name: Yup.string()
			.min(5, "nome deve ter no minímo 5 caracteres")
			.max(255, "mome deve ter no máximo 255 caracteres")
			.nullable(false)
			.required("nome é obrigatório"),
	});

	const initialUser = {
		id: "",
		login: "",
		email: "",
		password: "",
		name: ""
	};

	const [currentUser, setCurrentUser] = useState(initialUser);

	const getUser = async (id: number) => {
		setLoading(true);
		const data = await getUserById(id);
		setLoading(false);
		if (data) {
			setCurrentUser(data);
		}
	}

	useEffect(() => {
		if (id) {
			getUser(parseInt(id));
		}
	}, [id]);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	}

	const renderTitle = id ? "Atualizar Usuário" : "Cadastrar Usuário";
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
								initialValues={currentUser}
								validationSchema={validationSchema}
								onSubmit={async (values, { setSubmitting, setFieldError }) => {
									try {
										setSubmitting(true);
										const object = {
											...values
										};

										const data = await saveUpdateUser(object, values.id ? "put" : "post");
										setSubmitting(false);
										if (data) {
											history.push(inventoryUser);
											toast.success("Usuário salvo com sucesso!");
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

												<Grid item xs={12}>
													<Typography color="error" variant="subtitle2">
														* Campo(s) obrigatório(s)
													</Typography>
												</Grid>

												<Grid item xs={12}>
													<Field
														component={Input}
														variant="outlined"
														required
														fullWidth
														id="email"
														label="Email"
														name="email"
														autoComplete="email"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values?.email}
														helperText={errors.email && touched.email ? errors.email : ""}
														error={errors.email && touched.email}
													/>
												</Grid>
												
												<Grid item xs={12}>
													<Field
														component={Input}
														variant="outlined"
														required
														fullWidth
														id="login"
														label="Usuário"
														name="login"
														autoComplete="login"
														onChange={handleChange}
														onBlur={handleBlur}
														value={values?.login}
														helperText={errors.login && touched.login ? errors.login : ""}
														error={errors.login && touched.login}
													/>
												</Grid>
												
												<Grid item xs={12}>
													<Field
														component={Input}
														variant="outlined"
														required
														fullWidth
														name="password"
														label="Senha"
														type={showPassword ? "text" : "password"}
														id="password"
														autoComplete="current-password"
														onChange={handleChange}
														onBlur={handleBlur}
														InputProps={{
															endAdornment:
																<InputAdornment position="end">
																	<IconButton
																		aria-label="toggle password visibility"
																		onClick={handleClickShowPassword}
																		edge="end"
																	>
																		{showPassword ? <Visibility /> : <VisibilityOff />}
																	</IconButton>
																</InputAdornment>
			
														}}
														value={values?.password}
														helperText={errors.password && touched.password ? errors.password : ""}
														error={errors.password && touched.password}
													/>
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
														label="Nome Completo"
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

export default memo(CreateEditUser);